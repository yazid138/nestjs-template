import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { isMatch } from '../../utils/hash';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.checkUser(email);
    if (!user || (user && !(await isMatch(password, user.password))))
      throw new UnauthorizedException();
    return {
      accessToken: await this.jwtService.signAsync({ _id: user._id }),
      user,
    };
  }

  findUserById(id: string) {
    return this.usersService.findById(id);
  }

  validateJwt(jwtToken: string) {
    return this.jwtService.verifyAsync(jwtToken, {
      secret: this.configService.get<string>('APP_KEY'),
    });
  }
}
