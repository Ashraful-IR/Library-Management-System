import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

import { LibrarianEntity, LibrarianProfile } from './librarian.entity';
import {
  CreateLibrarianDto,
  UpdateLibrarianDto,
  LoginLibrarianDto,
  CreateLibrarianProfileDto,
} from './dto/create-librarian.dto';
import { Admin } from '../Admin/admin.entity';
import { query } from 'express';

@Injectable()
export class LibrarianService {
  constructor(
    @InjectRepository(LibrarianEntity)
    private readonly librarianRepository: Repository<LibrarianEntity>,
    @InjectRepository(LibrarianProfile)
    private readonly profileRepository: Repository<LibrarianProfile>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  //Register librarian

  async register(createDto: CreateLibrarianDto): Promise<LibrarianEntity> {
    const existing = await this.librarianRepository.findOne({
      where: { email: createDto.email },
    });

    if (existing) {
      throw new BadRequestException('Email is already registered');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createDto.password, salt);

    const librarian = this.librarianRepository.create({
      ...createDto,
      password: hashedPassword,
    });

    const saved = await this.librarianRepository.save(librarian);

    // Mailer
    try {
      await this.mailerService.sendMail({
        to: saved.email,
        subject: 'Welcome to Library Management System',
        text: `Hi ${saved.firstName}, your librarian account is ready.`,
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error?.message ?? error);
    }

    return saved;
  }

  // Login (Bcrypt + HttpException)

  async login(loginDto: LoginLibrarianDto): Promise<{ accessToken: string }> {
    const librarian = await this.librarianRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!librarian) {
      throw new HttpException('Invalid user', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      librarian.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('mail', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      sub: librarian.id,
      email: librarian.email,
      role: 'librarian',
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  // Basic CRUD

  async findAll(): Promise<LibrarianEntity[]> {
    return this.librarianRepository.find({
      relations: ['profile', 'supervisor'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneById(id: number): Promise<LibrarianEntity> {
    const librarian = await this.librarianRepository.findOne({
      where: { id },
      relations: ['profile', 'supervisor'],
    });

    if (!librarian) {
      throw new NotFoundException(`Librarian with id ${id} not found`);
    }

    return librarian;
  }

  //FindByEmail
  async findByEmail(email: string): Promise<LibrarianEntity> {
    const librarian = await this.librarianRepository.findOne({
      where: { email },
      relations: ['profile', 'supervisor'], // optional if you need relations
    });

    if (!librarian) {
      throw new NotFoundException(`Librarian with email "${email}" not found`);
    }

    return librarian;
  }

  async getLibrarianByPhone(phone: string) {
    const result = await this.librarianRepository.findOne({
      where: { phone },
    });

    if (!result) {
      throw new NotFoundException(`Librarian not found for phone: ${phone}`);
    }

    return result;
  }

  async update(id: number, dto: UpdateLibrarianDto): Promise<LibrarianEntity> {
    const librarian = await this.findOneById(id);

    if (dto.email && dto.email !== librarian.email) {
      const emailExists = await this.librarianRepository.findOne({
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

    Object.assign(librarian, dto);

    return this.librarianRepository.save(librarian);
  }

  async changeActiveStatus(
    id: number,
    isActive: boolean,
  ): Promise<LibrarianEntity> {
    const librarian = await this.findOneById(id);
    librarian.isActive = isActive;
    return this.librarianRepository.save(librarian);
  }

  async remove(id: number): Promise<{ message: string }> {
    const librarian = await this.findOneById(id);
    await this.librarianRepository.remove(librarian);
    return { message: `Librarian with id ${id} deleted` };
  }

  async searchByPhone(phone: string): Promise<LibrarianEntity[]> {
    const queryValue = `%${phone}%`;

    console.log('QUERY PHONE:', queryValue);

    return this.librarianRepository
      .createQueryBuilder('librarian')
      .where('librarian.phone LIKE :phone', { phone: queryValue })
      .getMany();
  }

  async searchByName(name: string): Promise<LibrarianEntity[]> {
    const queryValue = `%${name}%`;

    console.log('QUERY NAME:', queryValue);

    return this.librarianRepository
      .createQueryBuilder('librarian')
      .where('LOWER(librarian.firstName) LIKE LOWER(:name)', {
        name: queryValue,
      })
      .orWhere('LOWER(librarian.lastName) LIKE LOWER(:name)', {
        name: queryValue,
      })
      .getMany();
  }

  async removeByEmail(email: string): Promise<{ message: string }> {
    const librarian = await this.findByEmail(email);
    await this.librarianRepository.remove(librarian);
    return { message: `Librarian with email ${email} deleted` };
  }

  async removeByPhone(phone: string): Promise<{ message: string }> {
    const librarian = await this.getLibrarianByPhone(phone);
    await this.librarianRepository.remove(librarian);
    return { message: `Librarian with phone ${phone} deleted` };
  }

  //  One-to-One: Librarian <-> LibrarianProfile

  async upsertProfile(
    librarianId: number,
    dto: CreateLibrarianProfileDto,
  ): Promise<LibrarianEntity> {
    const librarian = await this.findOneById(librarianId);

    if (librarian.profile) {
      librarian.profile.address = dto.address ?? librarian.profile.address;
      librarian.profile.bio = dto.bio ?? librarian.profile.bio;
      await this.profileRepository.save(librarian.profile);
    } else {
      const profile = this.profileRepository.create({
        ...dto,
        id: librarian.id, // share same id
      });
      await this.profileRepository.save(profile);
      librarian.profile = profile;
    }

    return this.librarianRepository.save(librarian);
  }

  async deleteProfile(librarianId: number): Promise<void> {
    const librarian = await this.findOneById(librarianId);
    if (librarian.profile) {
      await this.profileRepository.remove(librarian.profile);
      librarian.profile = undefined;
      await this.librarianRepository.save(librarian);
    }
  }

  //  One-to-Many: Admin <-> Librarian

  async assignSupervisor(
    librarianId: number,
    adminId: number,
  ): Promise<LibrarianEntity> {
    const librarian = await this.findOneById(librarianId);
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${adminId} not found`);
    }

    librarian.supervisor = admin;
    return this.librarianRepository.save(librarian);
  }

  async getSupervisor(librarianId: number): Promise<Admin | null> {
    const librarian = await this.findOneById(librarianId);
    return librarian.supervisor ?? null;
  }

  async getLibrariansBySupervisor(adminId: number): Promise<LibrarianEntity[]> {
    return this.librarianRepository.find({
      where: { supervisor: { id: adminId } },
      relations: ['supervisor'],
    });
  }
}
