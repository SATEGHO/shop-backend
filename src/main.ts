import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
