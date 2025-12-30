import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

import { Admin, AdminProfile, AdminStatus } from './admin.entity';
import { LibrarianEntity } from '../Librarian/librarian.entity';
import {
  CreateAdminDto,
  UpdateAdminDto,
  LoginAdminDto,
  CreateAdminProfileDto,
} from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(AdminProfile)
    private readonly profileRepository: Repository<AdminProfile>,
    @InjectRepository(LibrarianEntity)
    private readonly librarianRepository: Repository<LibrarianEntity>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}


  async register(createDto: CreateAdminDto): Promise<Admin> {
    const existing = await this.adminRepository.findOne({
      where: { email: createDto.email },
    });

    if (existing) {
      throw new BadRequestException('Email is already registered');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createDto.password, salt);

    const admin = this.adminRepository.create({
      ...createDto,
      password: hashedPassword,
      role: createDto.role ?? 'admin',
      status: createDto.status ?? AdminStatus.ACTIVE,
    });

    const saved = await this.adminRepository.save(admin);

    try {
      await this.mailerService.sendMail({
        to: saved.email,
        subject: 'Admin Account Created',
        text: `Hi ${saved.fullName}, your admin account is ready.`,
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error?.message ?? error);
    }

    return saved;
    /* return {
    email: saved.email,
  };*/
  }


  async login(loginDto: LoginAdminDto): Promise<{ message: string; accessToken: string }> {
  const admin = await this.adminRepository.findOne({
    where: { email: loginDto.email },
  });

  if (!admin) {
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  const isPasswordValid = await bcrypt.compare(
    loginDto.password,
    admin.password,
  );

  if (!isPasswordValid) {
    throw new HttpException('Invalid crede', HttpStatus.UNAUTHORIZED);
  }

  const payload = {
    sub: admin.id,
    email: admin.email,
    role: 'admin',
  };

  const accessToken = await this.jwtService.signAsync(payload);

  return {
    message: 'Login successful',
    accessToken,
  };
}


  async findAll(status?: AdminStatus): Promise<Admin[]> {
    const options: any = {
      relations: ['profile', 'librarians'],
      order: { createdAt: 'DESC' },
    };

    if (status) {
      options.where = { status };
    }

    return this.adminRepository.find(options);
  }

  async findOneById(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { id },
      relations: ['profile', 'librarians'],
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    return admin;
  }

  async update(id: number, dto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOneById(id);

    if (dto.email && dto.email !== admin.email) {
      const emailExists = await this.adminRepository.findOne({
        where: { email: dto.email },
      });
      if (emailExists) {
        throw new BadRequestException('Email is already registered');
      }
    }

    if (dto.password) {
      const salt = await bcrypt.genSalt();
      dto.password = await bcrypt.hash(dto.password, salt);
    }

    Object.assign(admin, dto);

    return this.adminRepository.save(admin);
  }

  async changeStatus(id: number, status: AdminStatus): Promise<Admin> {
    const admin = await this.findOneById(id);
    admin.status = status;
    return this.adminRepository.save(admin);
  }

  async remove(id: number): Promise<{ message: string }> {
    const admin = await this.findOneById(id);
    await this.adminRepository.remove(admin);
    return { message: `Admin with id ${id} deleted` };
  }

  async searchByName(name: string): Promise<Admin[]> {
    const like = `%${name}%`;
    return this.adminRepository.find({
      where: { fullName: Like(like) },
    });
  }

  async getAdminsOlderThan(ageLimit: number): Promise<Admin[]> {
    return this.adminRepository
      .createQueryBuilder('admin')
      .where('admin.age > :age', { age: ageLimit })
      .orderBy('admin.age', 'DESC')
      .getMany();
  }

  async upsertProfile(
    adminId: number,
    dto: CreateAdminProfileDto,
  ): Promise<Admin> {
    const admin = await this.findOneById(adminId);

    if (admin.profile) {
      admin.profile.address = dto.address ?? admin.profile.address;
      admin.profile.bio = dto.bio ?? admin.profile.bio;
      await this.profileRepository.save(admin.profile);
    } else {
      const profile = this.profileRepository.create({
        ...dto,
        admin,
      });
      await this.profileRepository.save(profile);
      admin.profile = profile;
    }

    return this.adminRepository.save(admin);
  }

  async getProfile(adminId: number): Promise<AdminProfile | null> {
    const admin = await this.findOneById(adminId);
    return admin.profile ?? null;
  }

  async deleteProfile(adminId: number): Promise<void> {
    const admin = await this.findOneById(adminId);
    if (admin.profile) {
      await this.profileRepository.remove(admin.profile);
      admin.profile = undefined;
      await this.adminRepository.save(admin);
    }
  }



  async getLibrariansForAdmin(
    adminId: number,
  ): Promise<LibrarianEntity[]> {
    await this.findOneById(adminId);
    return this.librarianRepository.find({
      where: { supervisor: { id: adminId } },
      relations: ['supervisor'],
    });
  }

  async assignLibrarian(
    adminId: number,
    librarianId: number,
  ): Promise<LibrarianEntity> {
    const admin = await this.findOneById(adminId);

    const librarian = await this.librarianRepository.findOne({
      where: { id: librarianId },
      relations: ['supervisor'],
    });

    if (!librarian) {
      throw new NotFoundException(
        `Librarian with id ${librarianId} not found`,
      );
    }

    librarian.supervisor = admin;
    return this.librarianRepository.save(librarian);
  }
}
