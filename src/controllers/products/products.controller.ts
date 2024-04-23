import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  /* PARA RUTAS ESTATICAS DEBEN IR PRIMERO QUE LAS DINAMICAS
    PARA EVITAR CONFLICTOS ENTRE ELLAS
    ENDPOINT ESTATICO, NO RECIBE PARAMATROS
  */
    @Get('/filter')
    getProductFilter(){
      return 'yo soy un filter';
    }

    @Get('/:id')
    getOne(@Param('id') id: string){
      return {
        message: `producto con id: ${id}`
      }
    }

    @Get('/')
    @HttpCode(HttpStatus.ACCEPTED)
    get(
      @Query('limit') limit: number = 10,
      @Query('offset') offset: number = 0,
      @Query('brand') brand: string
    ){
      return {
        message: `limit : ${limit} y offset ${offset} y marca ${brand}`
      }
    }

    @Post('/')
    create(@Body() payload:any){
      return {
        message: 'acción de crear',
        payload,
      }
    }

    @Put('/:id')
    update(@Param('id') id:number, @Body() payload: any){
      return {
        id,
        payload
      }
    }

    @Delete('/:id')
    delete(@Param('id') id:number){
      return {
        id
      }
    }
}
