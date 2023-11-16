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
} from '@nestjs/common';
import { LaporanService } from './laporan.service';
import { CreateLaporanDto } from './dto/create-laporan.dto';
import { UseAuth } from '../auth/decorators/auth.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators';
import { LaporanGuard } from './guards/laporan.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDocument } from '../users/schemas/user.schema';
import { LogService } from '../log/log.service';
import { Level } from '../log/enums/level.enum';

@UseAuth()
@Controller('laporan')
@ApiTags('Laporan')
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
    await this.laporanService.create(user, file, data);
    await this.logService.create({
      message: `Laporan berhasil ditambah`,
      user: req.user,
      level: Level.INFO,
    });
    return { message: 'Laporan berhasil ditambah' };
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
    await this.laporanService.removeById(_id);
    await this.logService.create({
      message: `Laporan dengan id ${_id} berhasil dihapus`,
      user: req.user,
      level: Level.INFO,
    });
    return { message: 'Laporan berhasil dihapus' };
  }
}
