import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';

import { LibrarianService } from './librarian.service';
import { CreateLibrarianDto } from './dto/create-librarian.dto';

@Controller('librarian')
export class LibrarianController {
  constructor(private readonly librarianService: LibrarianService) {}

  @Post()
  createLibrarian(@Body() data: CreateLibrarianDto) {
    return this.librarianService.createLibrarian(data);
  }

  @Get()
  getAllLibrarians() {
    return this.librarianService.getAllLibrarians();
  }

  @Get(':id')
  getLibrarianById(@Param('id') id: string) {
    return this.librarianService.getLibrarianById(Number(id));
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
}
