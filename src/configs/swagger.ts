import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfiguration = (app): void => {
  const config = new DocumentBuilder()
    .setTitle('Todo Apis')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
