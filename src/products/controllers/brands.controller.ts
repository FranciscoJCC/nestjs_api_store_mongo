import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, FilterBrandsDto, UpdateBrandDto } from '../dtos/brands.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  //
  constructor(private brandsService: BrandsService) {}

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  get(@Query() params: FilterBrandsDto){
    return this.brandsService.findAll(params);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', MongoIdPipe) id: string){
    return this.brandsService.findOne(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateBrandDto){
    return this.brandsService.create(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateBrandDto){
    return this.brandsService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', MongoIdPipe) id: string){
    return this.brandsService.delete(id);
  }
}
