import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('E-commerce Order Processing')
    .setDescription('API for processing e-commerce orders')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.HTTP_PORT, '0.0.0.0', () =>
    console.log(`Listening on port ${process.env.HTTP_PORT}.`),
  );
}
bootstrap();
