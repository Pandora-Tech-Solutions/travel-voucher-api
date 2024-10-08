import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  page?: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  limit?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  companyName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  fantasyName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  cnpj?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  email?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false, type: Date })
  dateInit?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false, type: Date })
  dateEnd?: Date;
}
