import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom } from 'rxjs';

const API_KEY = 'dev-123123123';
const API_KEY_PROD = "prod-12343433232";

@Module({
  imports: [UsersModule, ProductsModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
    },
    {
      provide: 'TASKS',
      useFactory: async(http: HttpService) => {
        const response = await firstValueFrom(http.get('https://jsonplaceholder.typicode.com/todos'));

        return response.data;
      },
      inject: [ HttpService ]
    }
  ],
})
export class AppModule {}
