import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Company } from 'src/types/Company';
import { CreateCompanyDto } from './dto/create_company.dto';
import { ICompanyEntity } from 'src/entities/company.entity';
import { UpdateCompanyDto } from './dto/update_company.dto';
import { QueryDto } from './dto/query_company.dto';

@Injectable()
export class CompaniesRepository {
  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<ICompanyEntity>,
  ) {}

  async createUser(data: CreateCompanyDto): Promise<Company> {
    return this.companyModel.create(data);
  }

  async findAll(options: QueryDto) {
    const {
      page = 1,
      limit = 10,
      companyName = '',
      fantasyName = '',
      cnpj = '',
      dateEnd = null,
      dateInit = null,
      email = '',
    } = options;
    const skip = (page - 1) * limit;
    let query = {};

    if (companyName) {
      query = { ...query, name: { $regex: new RegExp(companyName, 'i') } };
    }

    if (fantasyName) {
      query = { ...query, name: { $regex: new RegExp(fantasyName, 'i') } };
    }

    if (email) {
      query = { ...query, email: { $regex: new RegExp(email, 'i') } };
    }

    if (cnpj) {
      query = { ...query, cpf: { $regex: new RegExp(cnpj, 'i') } };
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

    const data = await this.companyModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.companyModel.countDocuments(query).exec();
    const pages = Math.ceil(total / limit);

    return { data, total, page: +page, pages };
  }

  async findByEmail(email: string): Promise<Company> {
    return this.companyModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<Company> {
    return this.companyModel.findById(id).exec();
  }

  async update(id: string, data: UpdateCompanyDto): Promise<Company> {
    return this.companyModel
      .findOneAndUpdate({ _id: id }, data, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Company> {
    return this.companyModel.findByIdAndDelete(id).exec();
  }
}
