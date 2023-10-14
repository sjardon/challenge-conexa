import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMovieDto {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(400)
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
