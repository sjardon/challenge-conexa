import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { MoviesModule } from '../modules/movies/movies.module';

@Module({
  imports: [CommonModule, AuthModule, UsersModule, MoviesModule],
})
export class AppModule {}
