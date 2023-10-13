import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

const userRepositoryToken = getRepositoryToken(UserEntity);
describe('UsersService', () => {
  let fakeUsers: UserEntity[] = [];
  let service: UsersService;
  let usersRepository: Repository<UserEntity>;

  const findOne = jest.fn(async (filter?) => {
    const { email } = filter?.where;

    if (email) {
      const [filteredUser] = fakeUsers.filter((user) => {
        return user.email === email;
      });

      return filteredUser;
    }

    return undefined;
  });
  const create = jest.fn((user: UserEntity) => user);
  const save = jest.fn((user: UserEntity) => {
    fakeUsers.push(user);
    return user;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: userRepositoryToken,
          useValue: { findOne, create, save },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<UserEntity>>(userRepositoryToken);
  });

  afterEach(() => {
    fakeUsers = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const toCreateUser = {
      password: 'strongPass',
      email: 's@mail.com',
    } as CreateUserDto;

    const createdUser = await service.create(toCreateUser);

    expect(createdUser).toBeDefined();
  });

  it('should hash the password', async () => {
    const inputPassword = 'strongpassword';
    const toCreateUser = {
      password: inputPassword,
      email: 's@mail.com',
    } as CreateUserDto;

    jest.spyOn(bcrypt, 'hash');
    const createdUser = await service.create(toCreateUser);
    expect(createdUser.password).not.toBe(inputPassword);
    expect(bcrypt.hash).toBeCalled();
  });

  it('should not create duplicated users', async () => {
    expect.assertions(1);

    const toCreateUser = {
      password: 'strongPass',
      email: 's@mail.com',
    } as CreateUserDto;
    console.log(fakeUsers);

    await service.create(toCreateUser);

    const expectedError = new BadRequestException('User already exists');

    try {
      await service.create(toCreateUser);
    } catch (error) {
      expect(error).toEqual(expectedError);
    }
  });
});