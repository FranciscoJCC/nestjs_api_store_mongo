import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';


@Injectable()
export class BrandsService {

  constructor(@InjectModel(Brand.name) private brandService: Model<Brand>){}

  findAll(){
    return this.brandService.find().exec();
  }

  findOne(id: string){
    const brand = this.brandService.findById(id).exec();

    if(!brand){
      throw new NotFoundException('brand not found');
    }

    return brand;
  }

  /* create(payload: CreateBrandDto){
    this.counterId++;

    const newBrand = {
      id: this.counterId,
      ...payload
    };

    this.brands.push(newBrand);

    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto){
    const brand = this.findOne(id);

    const index = this.brands.findIndex((item) => item.id === id);

    this.brands[index] = {
      ...brand,
      ...payload
    };

    return this.brands[index];
  }

  delete(id: number){
    const brand = this.findOne(id);

    const index = this.brands.indexOf(brand);

    this.brands.splice(index, 1);

    return { message: "brand deleted"};
  } */

}
