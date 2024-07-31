import { Injectable, NotFoundException } from '@nestjs/common';
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

  async removeProduct(id: String, productId: string){
    const order = await this.orderModel.findById(id);

    order.products.pull(productId);

    return order.save();
  }

  async addProducts(id: string, productsIds: string[]){
    const order = await this.orderModel.findById(id);

    productsIds.forEach((product) => order.products.push(product));

    return order.save();
  }

  async delete(id: string){
    const deleteOrder = await this.orderModel.findByIdAndDelete(id).exec();

    if(!deleteOrder){
      throw new NotFoundException('order not found');
    }

    return { status: true, message: "order deleted"};

  }


}
