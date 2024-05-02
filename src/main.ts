import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Pipe, para validar inputs en las peticiones con los dtos
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //Quita elementos del payload cuando no se define en el dto
    forbidNonWhitelisted: true //Alertamos del error, cuando se agregue información no deseada al payload
  }));

  const config = new DocumentBuilder()
  .setTitle('Platzi Store')
  .setDescription('The store API description')
  .setVersion('1.0')
  .addTag('store')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
