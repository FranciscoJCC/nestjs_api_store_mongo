import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import config from '../../config';

const API_KEY = 'dev-123123123';
const API_KEY_PROD = "prod-12343433232";

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        //Variables de entorno
        const { connection, user, password, dbName, port, host } = configService.mongodb;

        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName
        }
      },
      inject: [config.KEY],
    })
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
    },
    //MONGODB
    {
      provide: 'MONGO',
      useFactory: async(configService: ConfigType<typeof config>) => {
        //Variables de entorno
        const { connection, user, password, dbName, port, host } = configService.mongodb;
        //Variablees de conexión
        const uri = `${connection}://${user}:${password}@${host}:${port}/`;
        const client = new MongoClient(uri);
        //Conexión
        await client.connect();
        //Seleccionamos la base de datos
        const database = client.db(dbName);
        //Retornamos la base de datos
        return database;
      },
      //Injectamos variables de entorno
      inject: [config.KEY]
    }
  ],
  exports: ['API_KEY', 'MONGO']
})
export class DatabaseModule {};
