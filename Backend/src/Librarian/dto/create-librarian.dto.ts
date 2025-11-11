import {
  IsEmail,
  Matches,
  MinLength,
  IsIn,
  IsNumberString,
} from 'class-validator';

export class CreateLibrarianDto {
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  firstName: string;

  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format!' })
  @Matches(/@aiub\.edu$/, { message: 'Email must contain aiub.edu domain!' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long!' })
  @Matches(/^(?=.*[A-Z]).+$/, {
    message: 'Password must contain at least one uppercase letter!',
  })
  password: string;

  @IsIn(['male', 'female'], { message: 'Gender must be male or female!' })
  gender: string;

  @IsNumberString({}, { message: 'Phone number must contain only numbers!' })
  phone: string;

  role?: string;

  @IsIn(['Librarian', 'Admin', 'Student'], {
    message: 'Role must be defined...',
  })
  designation: string;
}
