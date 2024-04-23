import { Controller, Param, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {

  @Get('/:id/products/:productId')
  getCategory(
    @Param('id') id: string,
    @Param('productId') productId: string
  ){
    return `categoria con id: ${id} y productId: ${productId}`;
  }

}
