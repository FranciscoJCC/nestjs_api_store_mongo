import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';

import { UserSchema, User } from './entities/user.entity';
import { CustomerSchema, Customer } from './entities/customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Customer.name,
        schema: CustomerSchema
      }
    ])
  ],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService]
})
export class UsersModule {}
