import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/entities/user.entity';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MailerModule.forRootAsync({
      useFactory: () => ({
        //Mailtrap's user and password
        transport: {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'eca53d965bb31b',
            pass: '5bf7e1a96d6bf3',
          },
        },
        template: {
          // dir: path.resolve(__dirname, '..', 'common', 'templates'),
          // adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [UserService, UsersRepository],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
