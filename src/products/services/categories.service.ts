import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';


@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Category.name) private categoryService: Model<Category>){}

  findAll(){
    return this.categoryService.find().exec();
  }

  findOne(id: string){
    const category = this.categoryService.findById(id).exec();

    if(!category){
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  /* create(payload: CreateCategoryDto){
    this.counterId++;

    const newCategory = {
      id: this.counterId,
      ...payload
    };

    this.categories.push(newCategory);

    return newCategory;
  }


  update(id: number, payload : UpdateCategoryDto){
    const category = this.findOne(id);

    const index = this.categories.findIndex((item) => item.id === id);

    this.categories[index] = {
      ...category,
      ...payload,
      id
    }

    return this.categories[index];
  }

  delete(id: number){
    const category = this.findOne(id);

    const index = this.categories.indexOf(category);

    this.categories.splice(index, 1);

    return { message: "category deleted"};
  } */



}
