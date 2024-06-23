import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.identity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ProductsService } from 'src/products/services/products.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userService: Model<User>){}


  async findAll(){
    return this.userService.find().exec();
  }

  async findOne(id: string){

    const user = this.userService.findById(id).exec();

    if(!user){
      throw new NotFoundException('user not found');
    }

    return user;
  }

  /* create(payload: CreateUserDto){
    this.counterId ++;

    const newUser = {
      id: this.counterId,
      ...payload
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, payload: UpdateUserDto){
    const user = this.findOne(id);

    const index = this.users.findIndex((item) => item.id === id);

    this.users[index] = {
      ...user,
      ...payload,
      id
    };

    return this.users[index];
  }

  delete(id: number){
    const user = this.findOne(id);

    const index = this.users.indexOf(user);

    this.users.splice(index,1);

    return { message: "user deleted"};
  } */

  /* async getOrdersByUser(id: number){
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: await this.productService.findAll()
    }
  } */
}
