import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import config from 'config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: Array<any>,
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ){}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return 'Hello World!';
  }

  getTasks(){
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
