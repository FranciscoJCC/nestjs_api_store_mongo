import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from "../dtos/products.dto";

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productService: Model<Product>){}

  async findAll(params?: FilterProductsDto) {

    if(params){
      const filters: FilterQuery<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;

      if(minPrice && maxPrice){
        filters.price = { $gte: minPrice, $lte: maxPrice }
      }

      return await this.productService.find(filters).populate('brand').skip(offset).limit(limit).exec();
    }

    return await this.productService.find().populate('brand').exec();
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

    return { status: true, message: "category deleted"};
  }

}
