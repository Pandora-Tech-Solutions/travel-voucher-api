import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AddressDto } from 'src/commons/dtos/Address.dto';
import { Roles } from 'src/types/Roles';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  rg: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  companies: string[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ enum: Roles, type: 'string', isArray: true })
  roles: Roles[];
}
