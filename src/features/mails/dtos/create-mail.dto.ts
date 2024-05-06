import { ApiProperty } from '@nestjs/swagger';

export class MailsDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  phone: string;
}
