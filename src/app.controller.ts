import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new')
  newEnpoint(){
    return 'Yo soy nuevo, sin slash';
  }

  @Get('/ruta/')
  hello(){
    return 'con slash'
  }

  /* PARA RUTAS ESTATICAS DEBEN IR PRIMERO QUE LAS DINAMICAS
    PARA EVITAR CONFLICTOS ENTRE ELLAS
    ENDPOINT ESTATICO, NO RECIBE PARAMATROS
  */
  @Get('/products/filter')
  getProductFilter(){
    return 'yo soy un filter';
  }

  @Get('/products/:id')
  getProduct(@Param('id') id: string){
    return `producto con id: ${id}`
  }

  @Get('/products')
  getProducts(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string
  ): string{
    return `limit : ${limit} y offset ${offset} y marca ${brand}`
  }

  @Get('/categories/:id/products/:productId')
  getCategory(
    @Param('id') id: string,
    @Param('productId') productId: string
  ){
    return `categoria con id: ${id} y productId: ${productId}`;
  }
}
