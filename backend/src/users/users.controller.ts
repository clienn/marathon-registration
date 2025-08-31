import { Body, Param, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  list() { return this.users.list(); }

  @Post()
  create(@Body() dto: CreateUserInput) {
    return this.users.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserInput
  ) {
    return this.users.update(+id, dto);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string
  ) {
    return this.users.delete(+id);
  }
}