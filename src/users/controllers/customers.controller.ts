import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService){}

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  get(){
    return this.customerService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number){
    return this.customerService.findOne(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCustomerDto){
    return this.customerService.create(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCustomerDto){
    return this.customerService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.customerService.delete(id);
  }

}
