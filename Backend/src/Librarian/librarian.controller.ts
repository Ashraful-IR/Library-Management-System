import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import {
  CreateLibrarianDto,
  UpdateLibrarianDto,
  LoginLibrarianDto,
  CreateLibrarianProfileDto,
} from './dto/create-librarian.dto';
import { JwtAuthGuard } from '../Admin/admin.guard';

@Controller('librarian')
export class LibrarianController {
  constructor(private readonly librarianService: LibrarianService) {}

  // ---------- Auth routes ----------

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  register(@Body() createDto: CreateLibrarianDto) {
    return this.librarianService.register(createDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Body() loginDto: LoginLibrarianDto) {
    return this.librarianService.login(loginDto);
  }

  // ---------- Basic CRUD (protected by JWT) ----------

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.librarianService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  search(@Query('name') name: string) {
    return this.librarianService.searchByName(name ?? '');
  }

  @UseGuards(JwtAuthGuard)
  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.librarianService.getLibrarianByPhone(phone);
  }

  // ------ Fetch by Email (STRING) ------
  @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.librarianService.findByEmail(email);
  }

  // ------ Fetch by ID (NUMBER) ------
  @UseGuards(JwtAuthGuard)
  @Get('id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.librarianService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('id/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateLibrarianDto,
  ) {
    return this.librarianService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('id/:id/active')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('isActive') isActive: boolean,
  ) {
    return this.librarianService.changeActiveStatus(id, isActive);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('id/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.librarianService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('email/:email')
  removeByEmail(@Param('email') email: string) {
    return this.librarianService.removeByEmail(email);
  }

  // ---------- One-to-One Profile ----------

  @UseGuards(JwtAuthGuard)
  @Put('id/:id/profile')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  upsertProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateLibrarianProfileDto,
  ) {
    return this.librarianService.upsertProfile(id, dto);
  }

  // ---------- Admin <-> Librarian Mapping ----------

  @UseGuards(JwtAuthGuard)
  @Put('id/:id/supervisor/:adminId')
  assignSupervisor(
    @Param('id', ParseIntPipe) id: number,
    @Param('adminId', ParseIntPipe) adminId: number,
  ) {
    return this.librarianService.assignSupervisor(id, adminId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('id/:id/supervisor')
  getSupervisor(@Param('id', ParseIntPipe) id: number) {
    return this.librarianService.getSupervisor(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('supervisor/:adminId')
  getBySupervisor(@Param('adminId', ParseIntPipe) adminId: number) {
    return this.librarianService.getLibrariansBySupervisor(adminId);
  }
}
