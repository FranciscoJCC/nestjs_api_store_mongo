import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, FilterBrandsDto, UpdateBrandDto } from '../dtos/brands.dto';


@Injectable()
export class BrandsService {

  constructor(@InjectModel(Brand.name) private brandService: Model<Brand>){}

  async findAll(params?: FilterBrandsDto){

    if(params){
      const { limit, offset } = params;

      return await this.brandService.find().skip(offset).limit(limit).exec();
    }
    return await this.brandService.find().exec();
  }

  async findOne(id: string){
    const brand = await this.brandService.findById(id).exec();

    if(!brand){
      throw new NotFoundException('brand not found');
    }

    return brand;
  }

  async create(data: CreateBrandDto){

    const newBrand = new this.brandService(data);

    return await newBrand.save();
  }

  async update(id: string, changes: UpdateBrandDto){

    const updateBrand = await this.brandService.findByIdAndUpdate(id,
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
    const brand = await this.brandService.findByIdAndDelete(id).exec();

    if(!brand){
      throw new NotFoundException('brand not found');
    }
    return { status: true , message: "brand deleted"};
  }

}
