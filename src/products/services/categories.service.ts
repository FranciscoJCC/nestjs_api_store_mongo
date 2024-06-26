import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';


@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Zapatos'
    }
  ];


  findAll(){
    return this.categories;
  }

  findOne(id: number){
    const category = this.categories.find((item) => item.id === id);

    if(!category){
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  create(payload: CreateCategoryDto){
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
  }



}
