import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Auth, User } from 'src/types/User';
import { LoginDTO } from './dto/login.dto';
import { UserValidator } from './validators/validate-user.validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userValidator: UserValidator,
  ) {}

  public async signIn(data: LoginDTO): Promise<Auth> {
    const user: User = await this.userValidator.validateUser(
      data.email,
      data.password,
    );

    user.password = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;

    return {
      user,
      access_token: await this.generateToken(user),
    };
  }

  private async generateToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      roles: user.roles,
    };
    return this.jwtService.sign(payload);
  }
}
