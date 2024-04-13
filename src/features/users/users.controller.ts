import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { QueryDto } from './dto/query_user.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt.guard';
import { Roles as ImportedRoles } from 'src/types/Roles';
import { HasRoles } from 'src/core/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { ForgotPassDto } from './dto/reset-pass.dto';
import { RedefinePassDto } from './dto/redefine-pass.dto copy';

@ApiTags('Users')
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly user: UserService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.user.create(data);
  }

  // @HasRoles(ImportedRoles.ADMIN)
  // @UseGuards(RolesGuard)
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

  @Post('forgot-password')
  forgotPassword(@Body() data: ForgotPassDto) {
    return this.user.forgotPassword(data.email);
  }

  @Post('reset-password')
  resetPassword(@Body() data: RedefinePassDto) {
    return this.user.redefinePassword(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.user.delete(id);
  }
}
