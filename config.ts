import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    database:{
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT
    },
    apiKey: process.env.API_KEY,
    mongodb: {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      dbName: process.env.MONGO_DB,
      port: parseInt(process.env.MONGO_PORT),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION
    }
  }
});
