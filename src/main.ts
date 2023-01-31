import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // enable API end points versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  //set API endpoint prefix
  app.setGlobalPrefix('api');

  // setup swagger documentation
  const config = new DocumentBuilder()
    .setTitle('URL Shortener Service')
    .setDescription('URL Shortener API doc')
    .setVersion('1.0')
    .addTag('services')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v:version/docs', app, document);
  // add DTO validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Start server
  await app.listen(process.env.PORT);
  console.log('====================================');
  console.log(`server is running at: localhost:${process.env.PORT}`);
  console.log('====================================');
}
bootstrap();
