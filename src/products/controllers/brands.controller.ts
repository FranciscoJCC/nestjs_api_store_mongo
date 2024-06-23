import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  //
  constructor(private brandsService: BrandsService) {

  }

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  get(){
    return this.brandsService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id') id: string){
    return this.brandsService.findOne(id);
  }

  /* @Post('/')
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateBrandDto){
    return this.brandsService.create(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBrandDto){
    return this.brandsService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.brandsService.delete(id);
  } */
}
