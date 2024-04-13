import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';

import { CreateUserDto } from './dto/create_user.dto';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update_user.dto';
import { QueryDto } from './dto/query_user.dto';
import { HmacSHA512 } from 'crypto-js';
import { RedefinePassDto } from './dto/redefine-pass.dto copy';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly mailerService: MailerService,
  ) {}

  async create(data: CreateUserDto) {
    try {
      return this.userRepository.createUser(data);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(query: QueryDto) {
    try {
      return this.userRepository.findAll(query);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      return this.userRepository.findByEmail(email);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(id: string) {
    try {
      return this.userRepository.findById(id);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      return this.userRepository.update(id, data);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string) {
    try {
      return this.userRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new HttpException(
          { message: 'Usuário não encontrado' },
          HttpStatus.NOT_FOUND,
        );
      }

      const data = uuidv4();

      const hashData = HmacSHA512(data, process.env.PASSWORD_SALT).toString();

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await this.userRepository.forgotPassword(user._id, {
        passwordResetToken: hashData,
        passwordResetExpires: now,
      });

      await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_FROM,
        subject: 'Recupere sua senha',
        template: 'forgot_pass',
        html: `<h1>Recupere sua senha </h1>
              <a href="${process.env.FRONTEND_URL}/reset-pass?token=${hashData}">Clique Aqui</a>
        `,
      });

      return new HttpException('', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async redefinePassword(data: RedefinePassDto) {
    try {
      const user = await this.userRepository.findByToken(data.token);

      if (!user) {
        throw new HttpException(
          { message: 'Token inválido' },
          HttpStatus.NOT_FOUND,
        );
      }

      if (user.passwordResetExpires < new Date()) {
        throw new HttpException(
          { message: 'Token expirado' },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.userRepository.update(user._id, {
        password: data.password,
      });

      await this.userRepository.forgotPassword(user._id, {
        passwordResetToken: null,
        passwordResetExpires: null,
      });

      return new HttpException('', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
