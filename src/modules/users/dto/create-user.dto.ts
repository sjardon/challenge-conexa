import { IsEmail } from 'class-validator';

export class CreateUserDto {
  password: string;

  @IsEmail()
  email: string;
}
