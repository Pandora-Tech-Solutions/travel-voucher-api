import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create_company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
