import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ResponseTransformInterceptor } from 'src/common/interceptors/response-transform.interceptor';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';
import { UseAuth } from './decorators/auth.decorator';
import { LogService } from '../log/log.service';
import { Level } from '../log/enums/level.enum';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ResponseTransformInterceptor)
export class AuthController {
  constructor(private logService: LogService) {}

  @ApiBody({ type: LoginDto })
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(
    @Req()
    req: Request & { user: { accessToken: string; user: UserDocument } },
    @Res() res: Response,
  ) {
    const payload = req.user;
    await this.logService.create({
      message: `${payload.user.name} berhasil login`,
      user: payload.user,
      level: Level.INFO,
    });
    res
      .cookie('auth-cookie', payload.accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        statusCode: HttpStatus.OK,
        data: {
          type: 'Bearer',
          accessToken: payload.accessToken,
        },
        message: 'Berhasil login',
      });
  }

  @UseAuth()
  @Delete('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('auth-cookie').json({
      statusCode: HttpStatus.OK,
      message: 'Berhasil logout',
    });
  }
}
