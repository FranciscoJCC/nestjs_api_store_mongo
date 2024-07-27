import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, FilterBrandsDto, UpdateBrandDto } from '../dtos/brands.dto';


@Injectable()
export class BrandsService {

  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>){}

  async findAll(params?: FilterBrandsDto){

    if(params){
      const { limit, offset } = params;

      return await this.brandModel.find().skip(offset).limit(limit).exec();
    }
    return await this.brandModel.find().exec();
  }

  async findOne(id: string){
    const brand = await this.brandModel.findById(id).exec();

    if(!brand){
      throw new NotFoundException('brand not found');
    }

    return brand;
  }

  async create(data: CreateBrandDto){

    const newBrand = new this.brandModel(data);

    return await newBrand.save();
  }

  async update(id: string, changes: UpdateBrandDto){

    const updateBrand = await this.brandModel.findByIdAndUpdate(id,
      {
        $set: changes
      },
      {
        new: true
      }
    ).exec();

    if(!updateBrand){
      throw new NotFoundException('Brand not found');
    }

    return updateBrand;
  }

  async delete(id: string){
    const brand = await this.brandModel.findByIdAndDelete(id).exec();

    if(!brand){
      throw new NotFoundException('brand not found');
    }
    return { status: true , message: "brand deleted"};
  }

}
