import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, FilterUsersDto, UpdateUserDto } from '../dtos/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService){}


  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  get(@Query() params: FilterUsersDto){
    return this.usersService.findAll(params);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', MongoIdPipe) id: string){
    return this.usersService.findOne(id);
  }

  /* @Get('/:id/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrders(@Param('id', ParseIntPipe) id: number){
    return this.usersService.getOrdersByUser(id);
  } */

   @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateUserDto){
    return this.usersService.create(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto){
    return this.usersService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', MongoIdPipe) id: string){
    return this.usersService.delete(id);
  }
}
