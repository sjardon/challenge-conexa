import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieEntity, ReducedMovieEntity } from '../entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private moviesRepository: Repository<MovieEntity>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const toCreateMovie = this.moviesRepository.create(createMovieDto);
    return await this.moviesRepository.save(toCreateMovie);
  }

  async findAll() {
    const movies = await this.moviesRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
      },
    });

    return movies;
  }

  async findOne(id: string) {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException(`Movie [${id}] not found`);
    }

    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException(`Movie [${id}] not found`);
    }

    const toUpdateMovie = this.moviesRepository.create({
      id,
      ...updateMovieDto,
    });

    return await this.moviesRepository.save(toUpdateMovie);
  }

  async remove(id: string) {
    return await this.moviesRepository.delete(id);
  }
}
