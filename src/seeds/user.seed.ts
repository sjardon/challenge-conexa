import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../modules/auth/services/auth.service';
import { UsersService } from '../modules/users/services/users.service';

@Injectable()
export class UserSeed {
  constructor(private readonly usersService: UsersService) {}

  @Command({
    command: 'seed:user',
    describe: 'seed users',
  })
  async seeds(): Promise<void> {
    try {
      await this.usersService.create({
        email: 'regular@mail.com',
        password: 'regular123',
      });

      await this.usersService.createAdmin({
        email: 'admin@mail.com',
        password: 'admin123',
      });
    } catch (error) {
      throw error;
    }
  }
}
