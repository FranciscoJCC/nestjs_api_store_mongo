import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.identity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {

  constructor(private productService: ProductsService){}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: "francisco@gmail.com",
      password: "admin123",
      role: 'admin'
    }
  ];

  findAll(){
    return this.users;
  }

  findOne(id){
    const user = this.users.find((item) => item.id === id);

    if(!user){
      throw new NotFoundException('user not found');
    }

    return user;
  }

  create(payload: CreateUserDto){
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
  }

  getOrdersByUser(id: number): Order{
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: this.productService.findAll()
    }
  }
}
