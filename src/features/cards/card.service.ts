import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create_card.dto';
import { UpdateCardDto } from './dto/update_card.dto';
import { QueryDto } from './dto/query_card.dto';
import { CardsRepository } from './card.repository';

@Injectable()
export class CardsService {
  constructor(private readonly cardRepository: CardsRepository) {}

  async create(data: CreateCardDto) {
    try {
      return this.cardRepository.createUser(data);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(query: QueryDto) {
    try {
      return this.cardRepository.findAll(query);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByUserId(userId: string) {
    try {
      return this.cardRepository.findByUserId(userId);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(id: string) {
    try {
      return this.cardRepository.findById(id);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, data: UpdateCardDto) {
    try {
      return this.cardRepository.update(id, data);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string) {
    try {
      return this.cardRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
