import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from 'src/entities/company.entity';
import { CompaniesService } from './company.service';
import { CompaniesController } from './company.controller';
import { CompaniesRepository } from './company.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  providers: [CompaniesService, CompaniesRepository],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
