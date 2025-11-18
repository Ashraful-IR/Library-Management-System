import {
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminStatus } from './admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createAdmin(@Body() data: CreateAdminDto) {
    return this.adminService.createAdmin(data);
  }

  @Get()
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @Get('filter/inactive')
  getInactiveAdmins() {
    return this.adminService.getInactiveAdmins();
    
  }

  @Get('filter/older-than-40')
  getAdminsOlderThan40() {
    return this.adminService.getAdminsOlderThan40();
  }

  @Get('search/name')
  searchAdmins(@Query('q') name: string) {
    return this.adminService.searchAdmins(name);
  }

  @Get(':id')
  getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(Number(id));
  }

  @Put(':id')
  updateAdmin(@Param('id') id: string, @Body() data: CreateAdminDto) {
    return this.adminService.updateAdmin(Number(id), data);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() data: Partial<CreateAdminDto>,
  ) {
    return this.adminService.partialUpdateAdmin(Number(id), data);
  }

  @Delete(':id')
  deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(Number(id));
  }

  @Patch(':id/role')
  assignRole(@Param('id') id: string, @Body('role') role: string) {
    return this.adminService.assignRole(Number(id), role);
  }

 @Patch(':id/status')
 changeStatus(
  @Param('id') id: string,
  @Body('status') status: string,
): Promise<any> {
  const adminStatus = status as AdminStatus;

  if (!['active', 'inactive'].includes(adminStatus)) {
    throw new BadRequestException('Status must be either active or inactive');
  }

  return this.adminService.changeStatus(Number(id), adminStatus);
}
}