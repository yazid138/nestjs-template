import {
  Controller,
  Delete,
  Get,
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
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ResponseTransformInterceptor)
export class AuthController {
  @ApiBody({ type: LoginDto })
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req: Request & { user: { accessToken: string } },
    @Res() res: Response,
  ) {
    const payload = req.user;
    return res
      .cookie('auth-cookie', payload.accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        statusCode: HttpStatus.OK,
        message: 'Berhasil login',
      });
  }

  @Auth()
  @Delete('logout')
  async logout(@Res() res: Response) {
    return res.clearCookie('auth-cookie').json({
      statusCode: HttpStatus.OK,
      message: 'Berhasil logout',
    });
  }
}
