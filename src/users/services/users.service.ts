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

  async create(data: CreateUserDto){

    const newUser = new this.userService(data);

    return await newUser.save();
  }

  async update(id: string, changes: UpdateUserDto){

    const updateUser = await this.userService.findByIdAndUpdate(id,
      {
        $set: changes
      },
      {
        new: true
      }
    ).exec();

    if(!updateUser){
      throw new NotFoundException('user not found');
    }

    return updateUser;
  }

  async delete(id: string){

    const deleteUser = await this.userService.findByIdAndDelete(id).exec();

    if(!deleteUser){
      throw new NotFoundException('user not found');
    }

    return { status: true, message: "user deleted"};
  }

  /* async getOrdersByUser(id: number){
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: await this.productService.findAll()
    }
  } */
}
