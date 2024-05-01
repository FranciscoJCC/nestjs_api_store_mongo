import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';

import { enviroments } from 'enviroments';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV ] || '.env',
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
