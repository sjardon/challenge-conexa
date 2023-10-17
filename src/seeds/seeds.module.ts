import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { UserSeed } from './user.seed';

@Module({
  providers: [UserSeed],
  imports: [UsersModule],
})
export class SeedsModule {}
