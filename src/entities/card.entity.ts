import { Schema, Document } from 'mongoose';
import { Card, OperationType } from '../types/Card';

export const CardSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  cardNumber: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
  cardExpirationDate: { type: String, required: true },
  historic: [
    {
      operationType: { type: String, enum: OperationType, required: true },
      operationDate: { type: Date, required: true },
      value: { type: Number, required: true },
    },
  ],
});

export interface ICardEntity extends Omit<Card, '_id'>, Document {}
