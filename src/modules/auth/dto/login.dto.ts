import { IsEmail } from 'class-validator';

export class LoginDto {
  password: string;

  @IsEmail()
  email: string;
}
