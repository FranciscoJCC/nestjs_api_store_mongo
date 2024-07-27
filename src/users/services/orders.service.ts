import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

@Injectable()
export class OrdersService {

  constructor(@InjectModel(Order.name) private orderModel: Model<Order>){}

  async findAll(){
    return this.orderModel
      .find()
      .populate('products')
      .populate('customer')
      .exec();
  }

  async findOne(id: string){
    return this.orderModel.findById(id);
  }

  async create(data: CreateOrderDto){
    const newOrder = new this.orderModel(data);

    return newOrder.save();
  }

  async update(id: string, changes: UpdateOrderDto){
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes}, { new: true })
      .exec();
  }

  async delete(id: string){
    return this.orderModel.findByIdAndDelete(id);
  }


}
