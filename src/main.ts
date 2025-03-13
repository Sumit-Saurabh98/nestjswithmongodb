import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ParseIntPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
