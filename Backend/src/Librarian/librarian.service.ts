import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateLibrarianDto } from "./dto/create-librarian.dto";

@Injectable()
export class LibrarianService {
  private librarians = [];
  private idCounter = 1;
    createLibrarian(data: CreateLibrarianDto) {
        const newLibrarian = { id: this.idCounter++, ...data };
        this.librarians.push(newLibrarian);
        return newLibrarian;
    }
    getAllLibrarians() {
        return this.librarians;
    }
    getLibrarianById(id: number) {
        const librarian = this.librarians.find(lib => lib.id === id);
        if (!librarian) {
            throw new BadRequestException('Librarian not found');
        }
        return librarian;
    }
    deleteLibrarian(id: number) {
        const index = this.librarians.findIndex(lib => lib.id === id);
        if (index === -1) {
            throw new BadRequestException('Librarian not found');
        }
        const deletedLibrarian = this.librarians.splice(index, 1);
        return deletedLibrarian[0];
    }
    updateLibrarian(id: number, data: CreateLibrarianDto) {
        const librarian = this.librarians.find(lib => lib.id === id);
        if (!librarian) {
            throw new BadRequestException('Librarian not found');
        }
        Object.assign(librarian, data);
        return librarian;
    }
    partialUpdateLibrarian(id: number, data: Partial<CreateLibrarianDto>) {
        const librarian = this.librarians.find(lib => lib.id === id);
        if (!librarian) {
            throw new BadRequestException('Librarian not found');
        }
        Object.assign(librarian, data);
        return librarian;
    }
    
}
