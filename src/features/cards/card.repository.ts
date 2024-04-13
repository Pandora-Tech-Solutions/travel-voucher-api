import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Card } from 'src/types/Card';
import { CreateCardDto } from './dto/create_card.dto';
import { ICardEntity } from 'src/entities/card.entity';
import { UpdateCardDto } from './dto/update_card.dto';
import { QueryDto } from './dto/query_card.dto';

@Injectable()
export class CardsRepository {
  constructor(
    @InjectModel('Card')
    private readonly cardModel: Model<ICardEntity>,
  ) {}

  async createUser(data: CreateCardDto): Promise<Card> {
    return this.cardModel.create(data);
  }

  async findAll(options: QueryDto) {
    const {
      page = 1,
      limit = 10,
      cardExpiration = '',
      cardNumber = '',
      dateEnd = null,
      dateInit = null,
      onlyWithoutUser = false,
      userId = '',
    } = options;
    const skip = (page - 1) * limit;
    let query = {};

    if (cardNumber) {
      query = { ...query, cardNumber: { $regex: new RegExp(cardNumber, 'i') } };
    }

    if (onlyWithoutUser) {
      query = { ...query, userId: { $exists: false } };
    }

    if (userId) {
      query = { ...query, userId: new Types.ObjectId(userId) };
    }

    if (cardExpiration) {
      query = {
        ...query,
        cardExpiration: {
          $lte: new Date(cardExpiration),
        },
      };
    }

    if (dateInit && dateEnd) {
      query = {
        ...query,
        createdAt: {
          $gte: new Date(dateInit),
          $lte: new Date(dateEnd),
        },
      };
    }

    const data = await this.cardModel
      .find({ ...query })
      .skip(skip)
      .limit(limit)
      .populate('userId')
      .populate({
        path: 'userId',
        populate: {
          path: 'companies',
          model: 'Company',
        },
      })
      .exec();
    const total = await this.cardModel.countDocuments(query).exec();
    const pages = Math.ceil(total / limit);

    return { data, total, page: +page, pages };
  }

  async findByUserId(userId: string): Promise<Card[]> {
    return this.cardModel
      .find({ userId })
      .populate('userId')
      .populate({
        path: 'userId',
        populate: {
          path: 'companies',
          model: 'Company',
        },
      })
      .exec();
  }

  async findById(id: string): Promise<Card> {
    return this.cardModel
      .findById(id)
      .populate('userId')
      .populate({
        path: 'userId',
        populate: {
          path: 'companies',
          model: 'Company',
        },
      })
      .exec();
  }

  async update(id: string, data: UpdateCardDto): Promise<Card> {
    return this.cardModel
      .findOneAndUpdate({ _id: id }, data, { new: true })
      .populate('userId')
      .populate({
        path: 'userId',
        populate: {
          path: 'companies',
          model: 'Company',
        },
      })
      .exec();
  }

  async delete(id: string): Promise<Card> {
    return this.cardModel.findByIdAndDelete(id).exec();
  }
}
