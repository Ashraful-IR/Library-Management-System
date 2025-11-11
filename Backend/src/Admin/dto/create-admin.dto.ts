import { IsEmail, Matches, MinLength, IsIn, IsNumberString } from 'class-validator';

export class CreateAdminDto {
  name: string;

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

  @IsNumberString({}, { message: 'invalid phone!' })
  phone: string;

  role?: string;
}
