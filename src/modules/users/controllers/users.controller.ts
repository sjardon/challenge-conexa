import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from '../../auth/constants/role.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAll() {
    return { it: 'work' };
  }
}
