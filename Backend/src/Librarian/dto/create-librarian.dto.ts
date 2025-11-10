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

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;

  @IsIn(['male', 'female', 'other'], {
    message: 'Gender must be male, female, or other',
  })
  gender: string;

  @IsNumberString({}, { message: 'Phone number must contain only numbers' })
  @MinLength(10, { message: 'Phone number must be at least 10 digits long' })
  phoneNumber: string;
}
