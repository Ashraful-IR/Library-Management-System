import { match } from 'assert';
import {
  IsEmail,
  Matches,
  MinLength,
  IsIn,
  IsNumberString,
  IsString,
  IsBoolean,
} from 'class-validator';
export class CreateLibrarianDto {
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  lastName: string;
  fullName: string;

  @IsEmail({}, { message: 'Invalid email format!' })
  @Matches(/@aiub\.edu$/, { message: 'Email must contain aiub.edu domain!' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long!' })
  @Matches(/^(?=.*[A-Z]).+$/, {
    message: 'Password must contain at least one uppercase letter!',
  })
  password: string;

  @IsIn(['male', 'female'], { message: 'Gender must be male or female!' })
  gender: string;

  @IsString()
  @IsNumberString()
  @Matches(/^[0-9]+$/, { message: 'Phone must contain only digits (no negative signs)' })
  phone: number;

  @IsIn(['Librarian', 'Admin', 'Student'], {
    message: 'Role must be defined...',
  })
  designation: string;

  @IsBoolean()
  isActive: boolean;
}
