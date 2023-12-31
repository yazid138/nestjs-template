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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ResponseTransformInterceptor } from 'src/common/interceptors/response-transform.interceptor';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';
import { UseAuth } from './decorators/auth.decorator';
import { LogService } from '../log/log.service';
import { LevelEnum } from '../log/enums/level.enum';
import { UserDocument } from '../users/schemas/user.schema';
import { Log } from '../log/schemas/log.schema';

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
    await this.logService.create(
      req as any,
      new Log(
        LevelEnum.INFO,
        `${payload.user.name} berhasil Login`,
        payload.user,
      ),
    );
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
  @ApiBearerAuth()
  @Delete('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('auth-cookie').json({
      statusCode: HttpStatus.OK,
      message: 'Berhasil logout',
    });
  }
}
