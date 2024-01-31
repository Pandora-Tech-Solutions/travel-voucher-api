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
import { CompaniesService } from './company.service';
import { CreateCompanyDto } from './dto/create_company.dto';
import { UpdateCompanyDto } from './dto/update_company.dto';
import { QueryDto } from './dto/query_company.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly company: CompaniesService) {}

  @Post()
  create(@Body() data: CreateCompanyDto) {
    return this.company.create(data);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.company.findAll(query);
  }

  @Get('email')
  findByEmail(@Query('email') email: string) {
    return this.company.findByEmail(email);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.company.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCompanyDto) {
    return this.company.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.company.delete(id);
  }
}
