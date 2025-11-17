import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateLibrarianDto } from './dto/create-librarian.dto';
import { validate } from 'class-validator';
import { LibrarianEntity } from './librarian.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LibrarianService {
  constructor(
    @InjectRepository(LibrarianEntity)
    private readonly librarianRepository: Repository<LibrarianEntity>,
  ) {}

  async createLibrarian(data: CreateLibrarianDto): Promise<LibrarianEntity> {
    // Step 1: Validate DTO
    const dto = Object.assign(new CreateLibrarianDto(), data);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints ?? {}))
        .flat()
        .join(', ');
      throw new BadRequestException(messages);
    }

    // Step 2: Create entity instance (NOT plain object)
    const newLibrarian = this.librarianRepository.create(data);
    
    // Step 3: Save to database
    // @BeforeInsert hook will trigger here
    const saved = await this.librarianRepository.save(newLibrarian);
    
    console.log('New Librarian Created:', saved);
    return saved;
  }

  async getAllLibrarians(): Promise<LibrarianEntity[]> {
    // Query from database, not in-memory array
    return await this.librarianRepository.find();
  }

  // librarian.service.ts
async findUsersWithNullFullName(): Promise<LibrarianEntity[]> {
  return await this.librarianRepository.find({
    where: {
      fullName: null,
    },
  });
}


  async getLibrarianById(id: number): Promise<LibrarianEntity> {
    const librarian = await this.librarianRepository.findOne({ where: { id } });
    if (!librarian) {
      throw new BadRequestException('Librarian not found');
    }
    return librarian;
  }

  async deleteLibrarian(id: number): Promise<{ message: string }> {
    const librarian = await this.getLibrarianById(id);
    await this.librarianRepository.remove(librarian);
    return { message: `Librarian with ID ${id} deleted successfully` };
  }

  async updateLibrarian(
    id: number,
    data: CreateLibrarianDto,
  ): Promise<LibrarianEntity> {
    const librarian = await this.getLibrarianById(id);
    
    // Update entity properties
    Object.assign(librarian, data);
    
    // Save changes to database
    return await this.librarianRepository.save(librarian);
  }

  async partialUpdateLibrarian(
    id: number,
    data: Partial<CreateLibrarianDto>,
  ): Promise<LibrarianEntity> {
    const librarian = await this.getLibrarianById(id);
    
    // Update only provided fields
    Object.assign(librarian, data);
    
    return await this.librarianRepository.save(librarian);
  }

  async assignRole(id: number, role: string): Promise<LibrarianEntity> {
    const librarian = await this.getLibrarianById(id);
    librarian.designation = role; // Assuming 'designation' is the role field
    return await this.librarianRepository.save(librarian);
  }

  async searchLibrarians(name: string): Promise<LibrarianEntity[]> {
    return await this.librarianRepository
      .createQueryBuilder('librarian')
      .where('LOWER(librarian.firstName) LIKE LOWER(:name)', { name: `%${name}%` })
      .orWhere('LOWER(librarian.lastName) LIKE LOWER(:name)', { name: `%${name}%` })
      .getMany();
  }
}