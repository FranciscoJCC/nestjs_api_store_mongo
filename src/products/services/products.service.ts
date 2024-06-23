import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from "../dtos/products.dto";
import { UpdateProductDto } from "../dtos/products.dto";

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productService: Model<Product>){}

  findAll() {
    return this.productService.find().exec();
  }

  async findOne(id: string){
    const product = await this.productService.findById(id).exec();

    if(!product){
      throw new NotFoundException('product not found');
    }

    return product;

  }

   async create(payload: CreateProductDto){

    const newProduct = new this.productService(payload);

    return await newProduct.save();
  }

  async update(id: string, changes: UpdateProductDto){

    const updateProduct = await this.productService.findByIdAndUpdate(id,
      {
        $set: changes,//Solo los cambios que se envien
      },
      {
        new : true
      } //Si queremos que nos retorne el producto ya actualizado
    ).exec();

    if(!updateProduct){
      throw new NotFoundException('product not found');
    }

    return updateProduct;

  }

  async delete(id: string){

    const deleteProduct = await this.productService.findByIdAndDelete(id).exec();

    if(!deleteProduct){
      throw new NotFoundException('product not found');
    }

    return deleteProduct
  }

}
