import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService){}

  @Get('/')
  async findAll(){
    return await this.ordersService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string){
    return await this.ordersService.findOne(id);
  }

  @Post('/')
  async create(@Body() payload: CreateOrderDto){
    return await this.ordersService.create(payload);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() payload: UpdateOrderDto){
    return await this.ordersService.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string){
    return await this.ordersService.delete(id);
  }
}
