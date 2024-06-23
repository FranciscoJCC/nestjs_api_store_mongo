import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {

  constructor(@InjectModel(Customer.name) private customerService: Model<Customer>){}


  findAll(){
    return this.customerService.find().exec();
  }

  findOne(id: string){
    const customer = this.customerService.findById(id);

    if(!customer){
      throw new NotFoundException('customer not found');
    }

    return customer;
  }

  /* create(payload: CreateCustomerDto){
    this.counterId++;

    const newCustomer = {
      id: this.counterId,
      ...payload
    };

    this.customers.push(newCustomer);

    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto){
    const user = this.findOne(id);
    const index = this.customers.findIndex((item) => item.id === id);

    this.customers[index] = {
      ...user,
      ...payload,
      id
    };

    return this.customers[index];
  }

  delete(id: number){
    const customer = this.findOne(id);

    const index = this.customers.indexOf(customer);

    this.customers.splice(index, 1);

    return { message: "customer deleted" };
  } */
}
