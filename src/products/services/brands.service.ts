import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';

@Injectable()
export class BrandsService {
  private counterId = 1;

  private brands: Brand[] = [
    {
      id: 1,
      name: "Adidas",
      image: "www.google.com"
    }
  ];


  findAll(){
    return this.brands;
  }

  findOne(id){
    const brand = this.brands.find((item) => item.id === id);

    if(!brand){
      throw new NotFoundException('brand not found');
    }

    return brand;
  }

  create(payload: CreateBrandDto){
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
  }

}
