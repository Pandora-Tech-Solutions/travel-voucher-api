import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OperationType } from 'src/types/Card';

class CardHistoricDto {
  @IsString()
  @IsEnum(OperationType)
  @IsNotEmpty()
  @ApiProperty()
  operationType: OperationType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  operationDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  value: string;
}

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cardNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cardExpirationDate: Date;

  @IsOptional()
  @ApiProperty({ type: [CardHistoricDto] })
  historic: CardHistoricDto[];
}
