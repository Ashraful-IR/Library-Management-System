import {
  IsEmail,
  IsString,
  IsInt,
  Min,
  Max,
  MinLength,
  IsNumberString,
  IsBoolean,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateLibrarianDto {
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  lastName: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNumberString({}, { message: 'Phone must contain only digits' })
  phone: string;

  @IsInt({ message: 'Age must be an integer' })
  @Min(18, { message: 'Age must be at least 18' })
  @Max(70, { message: 'Age must not be more than 70' })
  age: number;

  @IsString()
  designation: string;

  @IsBoolean()
  isActive: boolean;
}

export class UpdateLibrarianDto extends PartialType(CreateLibrarianDto) {}

export class LoginLibrarianDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CreateLibrarianProfileDto {
  @IsString()
  address: string;

  @IsString()
  bio: string;
}
