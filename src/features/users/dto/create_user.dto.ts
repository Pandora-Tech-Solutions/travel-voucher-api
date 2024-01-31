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
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  address: AddressDto;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  companies: string[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  roles: Roles[];
}

// name: string;
// cpf: string;
// rg?: string;
// email: string;
// password: string;
// address: Address;
// roles: Roles[];
// companies?: Company[];
