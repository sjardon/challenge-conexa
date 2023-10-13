import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  director: string;

  @IsString()
  producer: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  releasDate: Date;
}
