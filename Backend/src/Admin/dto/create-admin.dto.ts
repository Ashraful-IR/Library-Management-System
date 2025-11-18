import {
  IsEmail,
  Matches,
  MinLength,
  IsIn,
  IsNumberString,
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateAdminDto {
  @IsString({ message: 'Full name must be a string!' })
  fullName: string;

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

  @IsNumberString({}, { message: 'Phone must be a valid number string!' })
  phone: string;

  @IsInt({ message: 'Age must be an integer!' })
  @Min(18, { message: 'Admin must be at least 18 years old!' })
  @Max(80, { message: 'Age must not exceed 80!' })
  age: number;

  @IsOptional()
  @IsIn(['admin', 'librarian', ], {
    message: 'Role must be admin, librarian',
  })
  role?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Status must be active or inactive!',
  })
  status?: string;
}