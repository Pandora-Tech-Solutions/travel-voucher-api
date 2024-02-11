import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AddressDto } from 'src/commons/dtos/Address.dto';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fantasyName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty({ type: AddressDto })
  address: AddressDto;
}
