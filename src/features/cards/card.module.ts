import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from 'src/entities/card.entity';
import { CardsService } from './card.service';
import { CardsController } from './card.controller';
import { CardsRepository } from './card.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }])],
  providers: [CardsService, CardsRepository],
  controllers: [CardsController],
})
export class CardsModule {}
