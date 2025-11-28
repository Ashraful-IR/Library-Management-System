import {
  IsEmail,
  IsString,
  MinLength,
  IsNumberString,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsIn,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { AdminStatus } from '../admin.entity';

export class CreateAdminDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  fullName: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNumberString({}, { message: 'Phone must contain only digits' })
  phone: string;

  @IsInt({ message: 'Age must be an integer' })
  @Min(18, { message: 'Age must be at least 18' })
  @Max(80, { message: 'Age must not exceed 80' })
  age: number;

  @IsOptional()
  @IsIn(['admin', 'librarian'], {
    message: 'Role must be admin or librarian',
  })
  role?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Status must be active or inactive',
  })
  status?: AdminStatus;
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}

export class LoginAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CreateAdminProfileDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
