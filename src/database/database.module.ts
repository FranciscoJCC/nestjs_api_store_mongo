import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const API_KEY = 'dev-123123123';
const API_KEY_PROD = "prod-12343433232";

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
    },
    //MONGODB
    {
      provide: 'MONGO',
      useFactory: async() => {
        const uri = `mongodb://root:toor@localhost:27017/`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('platzi-store');
        return database;
      }
    }
  ],
  exports: ['API_KEY', 'MONGO']
})
export class DatabaseModule {}
