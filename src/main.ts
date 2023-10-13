import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
