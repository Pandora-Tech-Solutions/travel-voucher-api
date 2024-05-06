import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { MailsService } from "./mails.service";
import { MailsDTO } from "./dtos/create-mail.dto";

@ApiTags('Mails')
@Controller('mails')
export class MailsController {
  constructor(private readonly mail: MailsService) {}

  @Post()
  create(@Body() data: MailsDTO) {
    return this.mail.sendMail(data);
  }
}
