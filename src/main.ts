import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT;


  await app.listen(port).then(() => {
    Logger.debug(`Server is running on http://localhost:${port}`, 'Server');
  })
}

bootstrap();
