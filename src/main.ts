import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './common/response/exeption-filters/http-exeption.filter';
import { DefaultInterceptor } from './common/response/interceptors/default.interceptor';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new DefaultInterceptor());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  await app.listen(3000);
}
bootstrap();
