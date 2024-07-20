import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(express.static(join(__dirname, '../uploads')));

  await app.listen(3000);
}
bootstrap();
