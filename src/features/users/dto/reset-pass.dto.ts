import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPassDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
