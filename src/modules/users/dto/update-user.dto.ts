import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class UpdateUserDto {
  id: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
