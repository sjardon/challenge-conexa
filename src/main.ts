import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
