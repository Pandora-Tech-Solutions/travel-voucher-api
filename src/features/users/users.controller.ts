import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { QueryDto } from './dto/query_user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly user: UserService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.user.create(data);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.user.findAll(query);
  }

  @Get('email')
  findByEmail(@Query('email') email: string) {
    return this.user.findByEmail(email);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.user.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.user.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.user.delete(id);
  }
}
