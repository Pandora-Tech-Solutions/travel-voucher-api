import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailsService {
  constructor(protected readonly mailerService: MailerService) {}

  private readonly emailAttachments = [
    {
      cid: 'social-facebook',
      path: './src/templates/attachments/Facebook.png',
      filename: 'Facebook.png',
    },
    {
      cid: 'social-instagram',
      path: './src/templates/attachments/Instagram.png',
      filename: 'Instagram.png',
    },
    {
      cid: 'social-youtube',
      path: './src/templates/attachments/youtube.png',
      filename: 'youtube.png',
    },
  ];

  async sendMail(mail): Promise<any> {
    const data = await this.mailerService.sendMail({
      to: process.env.MAIL_TO,
      from: {
        name: 'Laike Turismo | Vale Viagem',
        address: process.env.MAIL_FROM,
      },
      subject: 'Contato sobre Vale Viagem',
      template: './mail',
      attachments: [...this.emailAttachments],
      context: {
        name: mail.name,
        title: 'Contato sobre Vale Viagem',
        phone: mail.phone,
        mail: mail.email,
        message: mail.message,
      },
    });
    return data;
  }
}
