import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Pipe, para validar inputs en las peticiones con los dtos
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //Quita elementos del payload cuando no se define en el dto
    forbidNonWhitelisted: true //Alertamos del error, cuando se agregue información no deseada al payload
  }));

  await app.listen(3000);
}
bootstrap();
