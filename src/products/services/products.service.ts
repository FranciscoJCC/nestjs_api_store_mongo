import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from "../dtos/products.dto";
import { UpdateProductDto } from "../dtos/products.dto";

@Injectable()
export class ProductsService {

  private counterId = 2;
  private products: Product[] = [
    {
      id: 1,
      name: "Producto 1",
      description: "lorem impusn",
      price: 1200,
      image: "URL",
      stock: 100
    },
    {
      id: 2,
      name: "Producto 2",
      description: "lorem impusn",
      price: 100,
      image: "URL",
      stock: 20
    }
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number){
    const product = this.products.find((item) => item.id === id);

    if(!product){
      throw new NotFoundException('product not found');
    }

    return product;

  }

  create(payload: CreateProductDto){

    this.counterId++;

    const newProduct = {
      id: this.counterId,
      ...payload
    }

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: UpdateProductDto){
    const product = this.findOne(id);

    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload
    };

    return this.products[index];

  }

  delete(id: number){
    const product = this.findOne(id);

    const productIndex = this.products.indexOf(product);

    this.products.splice(productIndex, 1);

    return { message: "product deleted"};
  }

}
