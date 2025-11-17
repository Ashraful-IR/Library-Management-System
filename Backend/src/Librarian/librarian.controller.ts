import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Patch,
  ValidationPipe,
} from '@nestjs/common';

import { LibrarianService } from './librarian.service';
import { CreateLibrarianDto } from './dto/create-librarian.dto';

@Controller('librarian')
export class LibrarianController {
  constructor(private readonly librarianService: LibrarianService) {}

  @Get()
  getAllLibrarians() {
    return this.librarianService.getAllLibrarians();
  }

  @Get('fullName-null')
  async getUsersWithNullFullName() {
    return await this.librarianService.findUsersWithNullFullName();
  }

  @Get(':id')
  getLibrarianById(@Param('id') id: string) {
    return this.librarianService.getLibrarianById(Number(id));
  }

  @Post()
  async create(
    // ValidationPipe applies all @IsXxx decorators
    @Body(new ValidationPipe())
    createLibrarianDto: CreateLibrarianDto,
  ) {
    return await this.librarianService.createLibrarian(createLibrarianDto);
  }

  @Delete(':id')
  deleteLibrarian(@Param('id') id: string) {
    return this.librarianService.deleteLibrarian(Number(id));
  }

  @Put(':id')
  updateLibrarian(@Param('id') id: string, @Body() data: CreateLibrarianDto) {
    // For simplicity, reusing CreateLibrarianDto for update
    return this.librarianService.updateLibrarian(Number(id), data);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() data: Partial<CreateLibrarianDto>,
  ) {
    return this.librarianService.partialUpdateLibrarian(Number(id), data);
  }
  @Get(':id/role/:role')
  assignRole(@Param('id') id: string, @Param('role') role: string) {
    return this.librarianService.assignRole(Number(id), role);
  }
}
