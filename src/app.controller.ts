import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('/products/:id')
  getProduct(@Param('id') id: string){
    return `producto con id: ${id}`
  }

  @Get('/categories/:id/products/:productId')
  getCategory(
    @Param('id') id: string,
    @Param('productId') productId: string
  ){
    return `categoria con id: ${id} y productId: ${productId}`;
  }
}
