import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';

import { AdminService } from './admin.service';
import {
  CreateAdminDto,
  UpdateAdminDto,
  LoginAdminDto,
  CreateAdminProfileDto,
} from './dto/create-admin.dto';
import { AdminStatus } from './admin.entity';
import { JwtAuthGuard } from './admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // -------- Auth --------

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  register(@Body() createDto: CreateAdminDto) {
    return this.adminService.register(createDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Body() loginDto: LoginAdminDto) {
    return this.adminService.login(loginDto);
  }

  // -------- Basic CRUD (protected by JWT guard) --------

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('status') status?: AdminStatus) {
    return this.adminService.findAll(status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  search(@Query('name') name: string) {
    return this.adminService.searchByName(name ?? '');
  }

  @UseGuards(JwtAuthGuard)
  @Get('older-than/:age')
  getOlderThan(@Param('age', ParseIntPipe) age: number) {
    return this.adminService.getAdminsOlderThan(age);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAdminDto,
  ) {
    return this.adminService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: AdminStatus,
  ) {
    if (!Object.values(AdminStatus).includes(status)) {
      throw new BadRequestException(
        'Status must be either active or inactive',
      );
    }
    return this.adminService.changeStatus(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }

  // -------- One-to-One: Admin <-> AdminProfile --------

  @UseGuards(JwtAuthGuard)
  @Put(':id/profile')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  upsertProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAdminProfileDto,
  ) {
    return this.adminService.upsertProfile(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/profile')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/profile')
  deleteProfile(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteProfile(id);
  }

  // -------- One-to-Many: Admin <-> LibrarianEntity --------

  @UseGuards(JwtAuthGuard)
  @Get(':id/librarians')
  getLibrarians(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getLibrariansForAdmin(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/librarians/:librarianId')
  assignLibrarian(
    @Param('id', ParseIntPipe) id: number,
    @Param('librarianId', ParseIntPipe) librarianId: number,
  ) {
    return this.adminService.assignLibrarian(id, librarianId);
  }
}
