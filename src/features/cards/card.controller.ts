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
import { CardsService } from './card.service';
import { CreateCardDto } from './dto/create_card.dto';
import { UpdateCardDto } from './dto/update_card.dto';
import { QueryDto } from './dto/query_card.dto';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly card: CardsService) {}

  @Post()
  create(@Body() data: CreateCardDto) {
    return this.card.create(data);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.card.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.card.findById(id);
  }

  @Get('by-user/:id')
  findByUserId(@Param('id') id: string) {
    return this.card.findByUserId(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCardDto) {
    return this.card.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.card.delete(id);
  }
}
