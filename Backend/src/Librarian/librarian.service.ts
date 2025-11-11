import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateLibrarianDto } from './dto/create-librarian.dto';
import { validate } from 'class-validator';

@Injectable()
export class LibrarianService {
  private librarians = [];
  async createLibrarian(data: CreateLibrarianDto) {
    const dto = Object.assign(new CreateLibrarianDto(), data);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints ?? {}))
        .flat()
        .join(', ');
      throw new BadRequestException(messages);
    }
    const newLibrarian = { id: Date.now(), ...data };
    this.librarians.push(newLibrarian);
    return {message: 'Librarian created successfully', librarian: newLibrarian};
  }
  getAllLibrarians() {
    return this.librarians;
  }
  getLibrarianById(id: number) {
    const librarian = this.librarians.find((lib) => lib.id === id);
    if (!librarian) {
      throw new BadRequestException('Librarian not found');
    }
    return librarian;
  }
  deleteLibrarian(id: number) {
    const index = this.librarians.findIndex((lib) => lib.id === id);
    if (index === -1) {
      throw new BadRequestException('Librarian not found');
    }
    const deletedLibrarian = this.librarians.splice(index, 1);
    return deletedLibrarian[0];
  }
  updateLibrarian(id: number, data: CreateLibrarianDto) {
    const librarian = this.librarians.find((lib) => lib.id === id);
    if (!librarian) {
      throw new BadRequestException('Librarian not found');
    }
    Object.assign(librarian, data);
    return librarian;
  }
  partialUpdateLibrarian(id: number, data: Partial<CreateLibrarianDto>) {
    const librarian = this.librarians.find((lib) => lib.id === id);
    if (!librarian) {
      throw new BadRequestException('Librarian not found');
    }
    Object.assign(librarian, data);
    return librarian;
  }
  assignRole(id: number, role: string) {
    const librarian = this.librarians.find((lib) => lib.id === id);
    if (!librarian) {
      throw new BadRequestException('Librarian not found');
    }
    librarian.role = role;
    return librarian;
  }
  searchLibrarians(name: string) {
    return this.librarians.filter(
      (lib) =>
        lib.firstName.toLowerCase().includes(name.toLowerCase()) ||
        lib.lastName.toLowerCase().includes(name.toLowerCase()),
    );
  }
}
