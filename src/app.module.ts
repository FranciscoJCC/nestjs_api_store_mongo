import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as Joi from 'joi';
import { MongoClient } from 'mongodb';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom, take } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { enviroments } from 'enviroments';
import config from 'config';

//Mongo DB
const uri = `mongodb://root:toor@localhost:27017/`;
const client = new MongoClient(uri);

async function run(){
  await client.connect();
  const database = client.db('platzi-store');
  const tasksCollection = database.collection('tasks');
  const tasks = await tasksCollection.find().toArray();
  console.log(tasks);
}

run();

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV ] || '.env',
      load: [ config ],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required()
      })
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
