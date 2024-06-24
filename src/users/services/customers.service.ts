import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, FilterCustomersDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {

  constructor(@InjectModel(Customer.name) private customerService: Model<Customer>){}


  async findAll(params?: FilterCustomersDto){

    if(params){
      const { limit, offset } = params;

      return await this.customerService.find().skip(offset).limit(limit).exec();
    }
    return this.customerService.find().exec();
  }

  async findOne(id: string){
    const customer = await this.customerService.findById(id);

    if(!customer){
      throw new NotFoundException('customer not found');
    }

    return customer;
  }

  async create(data: CreateCustomerDto){

    const newCustomer = new this.customerService(data);

    return await newCustomer.save();
  }

  async update(id: string, changes: UpdateCustomerDto){

    const customerUpdate = await this.customerService.findByIdAndUpdate(id,
      {
        $set: changes
      },
      {
        new: true
      }
    ).exec();

    if(!customerUpdate){
      throw new NotFoundException('customer not found');
    }

    return customerUpdate;
  }

  async delete(id: string){

    const customer = await this.customerService.findByIdAndDelete(id);

    if(!customer){
      throw new NotFoundException('customer not found');
    }

    return { status: true, message: "customer deleted" };
  }
}
