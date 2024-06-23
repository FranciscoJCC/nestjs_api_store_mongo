import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from "../dtos/products.dto";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {

  //Inyectamos una intancia de productService
  constructor(private productsService: ProductsService){

  }

  /* PARA RUTAS ESTATICAS DEBEN IR PRIMERO QUE LAS DINAMICAS
    PARA EVITAR CONFLICTOS ENTRE ELLAS
    ENDPOINT ESTATICO, NO RECIBE PARAMATROS
  */
    @Get('/filter')
    getProductFilter(){
      return 'yo soy un filter';
    }

    @Get('/')
    @ApiOperation({ summary: 'List of products'})
    @HttpCode(HttpStatus.ACCEPTED)
    get(@Query() params: FilterProductsDto){
      return this.productsService.findAll(params);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('id', MongoIdPipe) id: string){
      return this.productsService.findOne(id);
    }

    @Post('/')
    @HttpCode(HttpStatus.ACCEPTED)
    create(@Body() payload: CreateProductDto){
      return this.productsService.create(payload);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto){
      return this.productsService.update(id, payload);
    }

    @Delete('/:id')
    delete(@Param('id', MongoIdPipe) id:string){
      return this.productsService.delete(id);
    }
}
