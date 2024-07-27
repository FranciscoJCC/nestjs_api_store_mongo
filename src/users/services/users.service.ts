import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity'
import { CreateUserDto, FilterUsersDto, UpdateUserDto } from '../dtos/users.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>){}


  async findAll(params?: FilterUsersDto){

    if(params){
      const { limit, offset } = params;

      return await this.userModel.find().skip(offset).limit(limit).exec();
    }

    return this.userModel.find().exec();
  }

  async findOne(id: string){

    const user = this.userModel.findById(id).exec();

    if(!user){
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async create(data: CreateUserDto){

    const newUser = new this.userModel(data);

    return await newUser.save();
  }

  async update(id: string, changes: UpdateUserDto){

    const updateUser = await this.userModel.findByIdAndUpdate(id,
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

    const deleteUser = await this.userModel.findByIdAndDelete(id).exec();

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
