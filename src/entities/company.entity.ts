import { Schema, Document } from 'mongoose';
import { Company } from '../types/Company';

export const CompanySchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  companyName: { type: String, required: true },
  fantasyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  address: {
    street: { type: String, required: true },
    number: { type: Number, required: true },
    complement: { type: String, required: false },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
});

export interface ICompanyEntity extends Omit<Company, '_id'>, Document {}
