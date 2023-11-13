import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { RequestContext } from '@medibloc/nestjs-request-context';
import { MyContext } from '../../../common/context/my-context';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = RequestContext.get<MyContext>();
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const data = await this.authService.validateJwt(token);
      if (data) {
        const user = await this.authService.findUserById(data._id);
        request['user'] = user;
        ctx.user = user;
      }
    } catch (e) {
      Logger.error(e);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [
      '',
      request.cookies['auth-cookie'],
    ];
    return type === 'Bearer' ? token : token ? token : undefined;
  }
}
