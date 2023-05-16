import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? for using validation pipes globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  //? whitelist remove any extra data that is passed to the pipe
  }))

  await app.listen(3001);
}
bootstrap();
