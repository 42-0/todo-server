import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfiguration } from './configs/swagger';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (process.env.NODE_ENV === 'development') {
    swaggerConfiguration(app);
  }

  await app.listen(3500);
  console.log(`Application is running on: ${await app.getUrl()}`);
};
bootstrap();
