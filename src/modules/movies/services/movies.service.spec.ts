import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../services/movies.service';
import { MovieEntity } from '../entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateMovieDto } from '../dto/update-movie.dto';

const moviesRepositoryToken = getRepositoryToken(MovieEntity);

describe('MoviesService', () => {
  let service: MoviesService;
  let fakeMovies: MovieEntity[] = [];
  let moviesRepository: Repository<MovieEntity>;

  const findOneBy = jest.fn(async (filter?) => {
    const { id } = filter;

    if (id) {
      const [filteredMovie] = fakeMovies.filter((movie) => {
        return movie.id === id;
      });

      return filteredMovie;
    }

    return undefined;
  });
  const find = jest.fn();
  const create = jest.fn((entity: MovieEntity) => entity);
  const save = jest.fn((entity: MovieEntity) => {
    fakeMovies.push(entity);
    return entity;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: moviesRepositoryToken,
          useValue: { find, findOneBy, create, save },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<Repository<MovieEntity>>(
      moviesRepositoryToken,
    );
  });

  afterEach(() => {
    fakeMovies = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should select fileds of movie entity', async () => {
      jest.spyOn(moviesRepository, 'find');

      await service.findAll();
      expect(moviesRepository.find).toBeCalledWith({
        select: {
          id: true,
          title: true,
          description: true,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should find one movie', async () => {
      const id = 'd65e528f-43e3-4bb9-83bb-f96b5ba4649a';
      const toCreateMovie = {
        title: 'Harry Potter y la piedra filosofal',
        description: 'La historia sigue a...',
        director: 'Chris Columbus',
        producer: 'Heyday Films',
        releasDate: new Date('2001-11-22'),
      } as CreateMovieDto;

      moviesRepository.findOneBy = jest.fn().mockResolvedValue(toCreateMovie);
      const foundMovie = await service.findOne(id);

      expect(foundMovie).toBeDefined();
    });

    it('should throw an error if the movie does not exists', async () => {
      expect.assertions(1);
      const id = 'd65e528f-43e3-4bb9-83bb-f96b5ba4649a';
      const expectedError = new NotFoundException(`Movie [${id}] not found`);
      try {
        await service.findOne(id);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('findOne', () => {
    it('should update one movie', async () => {
      const id = 'd65e528f-43e3-4bb9-83bb-f96b5ba4649a';
      const toCreateMovie = {
        title: 'Movie1',
        description: 'La historia sigue a...',
        director: 'Chris Columbus',
        producer: 'Heyday Films',
        releasDate: new Date('2001-11-22'),
      } as CreateMovieDto;

      const toUpdateMovie = {
        title: 'Movie2',
      } as UpdateMovieDto;

      moviesRepository.findOneBy = jest.fn().mockResolvedValue(toCreateMovie);
      jest.spyOn(moviesRepository, 'save');
      const foundMovie = await service.update(id, toUpdateMovie);

      expect(moviesRepository.save).toBeCalledWith({ id, ...toUpdateMovie });
    });

    it('should throw an error if the movie is not found', async () => {
      expect.assertions(1);
      const id = 'd65e528f-43e3-4bb9-83bb-f96b5ba4649a';
      const expectedError = new NotFoundException(`Movie [${id}] not found`);
      try {
        await service.update(id, { title: 'movie' });
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
