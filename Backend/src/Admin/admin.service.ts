import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  private admins = [];

  createAdmin(data: CreateAdminDto) {
    
    if (!data.email || !data.email.includes('@aiub.edu')) {
      return { message: 'Invalid email! It must include @aiub.edu domain.' };
    }

   
    if (data.password.length < 6 || !/[A-Z]/.test(data.password)) {
      return { message: 'Password must be at least 6 characters and contain one uppercase letter.' };
    }


    if (data.gender !== 'male' && data.gender !== 'female') {
      return { message: 'Gender must be male or female.' };
    }

 
    if (!/^[0-9]+$/.test(data.phone)) {
      return { message: 'Phone number must contain only numbers.' };
    }

    const newAdmin = { id: Date.now(), ...data };
    this.admins.push(newAdmin);
    return { message: 'Admin created successfully', admin: newAdmin };
  }

  getAllAdmins() {
    return { message: 'All admins fetched', admins: this.admins };
  }

  getAdminById(id: number) {
    const admin = this.admins.find(a => a.id === id);
    if (!admin) return { message: 'Admin not found' };
    return { message: 'Admin found', admin };
  }

  updateAdmin(id: number, data: CreateAdminDto) {
    const admin = this.admins.find(a => a.id === id);
    if (!admin) return { message: 'Admin not found' };
    Object.assign(admin, data);
    return { message: 'Admin updated successfully', admin };
  }

  partialUpdateAdmin(id: number, data: Partial<CreateAdminDto>) {
    return this.updateAdmin(id, data as CreateAdminDto);
  }

  deleteAdmin(id: number) {
    this.admins = this.admins.filter(a => a.id !== id);
    return { message: 'Admin deleted successfully' };
  }

  assignRole(id: number, role: string) {
    const admin = this.admins.find(a => a.id === id);
    if (!admin) return { message: 'Admin not found' };
    admin.role = role;
    return { message: 'Role assigned successfully', admin };
  }

  searchAdmins(name: string) {
    const results = this.admins.filter(a =>
      a.name.toLowerCase().includes(name.toLowerCase()),
    );
    return { message: 'Search results', results };
  }
}
