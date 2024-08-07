import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto, FilterCategoriesDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';


@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>){}

  async findAll(params?: FilterCategoriesDto){
    if(params){
      const { limit, offset } = params;

      return await this.categoryModel.find().skip(offset).limit(limit).exec();
    }
    return await this.categoryModel.find().exec();
  }

  async findOne(id: string){
    const category = await this.categoryModel.findById(id).exec();

    if(!category){
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async create(data: CreateCategoryDto){

    const newCategory = new this.categoryModel(data);

    return await newCategory.save();
  }


  async update(id: string, changes : UpdateCategoryDto){

    const updateCategory = await this.categoryModel.findByIdAndUpdate(id,
      {
        $set: changes
      },
      {
        new: true
      }
    ).exec();

    if(!updateCategory){
      throw new NotFoundException('Category not found');
    }

    return updateCategory;
  }

  async delete(id: string){
    const category = await this.categoryModel.findByIdAndDelete(id).exec();

    if(!category){
      throw new NotFoundException('Category not found');
    }

    return { status: true, message: "category deleted"};
  }

}
