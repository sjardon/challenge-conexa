import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './controllers/movies.controller';
import { MovieEntity } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [TypeOrmModule.forFeature([MovieEntity])],
})
export class MoviesModule {}
