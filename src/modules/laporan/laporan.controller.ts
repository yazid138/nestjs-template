import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { LaporanService } from './laporan.service';
import { CreateLaporanDto } from './dto/create-laporan.dto';
import { UseAuth } from '../auth/decorators/auth.decorator';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCookieAuth,
  ApiTags,
} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators';
import { LaporanGuard } from './guards/laporan.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDocument } from '../users/schemas/user.schema';
import { LogService } from '../log/log.service';
import { LevelEnum } from '../log/enums/level.enum';
import { Request } from 'express';
import { Log } from '../log/schemas/log.schema';

@UseAuth()
@Controller('laporan')
@ApiTags('Laporan')
@ApiBearerAuth()
export class LaporanController {
  constructor(
    private readonly laporanService: LaporanService,
    private readonly logService: LogService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('document'))
  async create(
    @Req() req: Request & { user: UserDocument },
    @Body() data: CreateLaporanDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req.user;
    try {
      await this.laporanService.create(user, file, data);
      await this.logService.create(
        req,
        new Log(LevelEnum.INFO, 'Laporan berhasil ditambah', user),
      );
      return { message: 'Laporan berhasil ditambah' };
    } catch (e) {
      await this.logService.create(
        req,
        new Log(LevelEnum.INFO, 'Laporan gagal ditambah', user),
      );
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get()
  getAll(@Req() req: Request & { user: UserDocument }) {
    const user = req.user;
    return this.laporanService.findAll(user.role);
  }

  @Delete(':id')
  @UseGuards(LaporanGuard)
  async remove(
    @Param('id') _id: string,
    @Req() req: Request & { user: UserDocument },
  ) {
    const user = req.user;
    try {
      await this.laporanService.removeById(_id);
      await this.logService.create(
        req,
        new Log(LevelEnum.INFO, 'Laporan berhasil dihapus', user),
      );
      return { message: 'Laporan berhasil dihapus' };
    } catch (e) {
      await this.logService.create(
        req,
        new Log(LevelEnum.INFO, 'Laporan gagal dihapus', user),
      );
      throw new InternalServerErrorException(e.message);
    }
  }
}
