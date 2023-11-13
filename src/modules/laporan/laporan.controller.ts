import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { LaporanService } from './laporan.service';
import { CreateLaporanDto } from './dto/create-laporan.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../users/interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators';
import { LaporanGuard } from './guards/laporan.guard';

@Auth()
@Controller('laporan')
@ApiTags('Laporan')
export class LaporanController {
  constructor(private readonly laporanService: LaporanService) {}

  @Post()
  async create(
    @Req() req: Request & { user: User },
    @Body() data: CreateLaporanDto,
  ) {
    const user = req.user;
    await this.laporanService.create(user, data);
    return { message: 'Laporan berhasil ditambah' };
  }

  @Get()
  getAll(@Req() req: Request & { user: User }) {
    const user = req.user;
    return this.laporanService.findAll(user.role);
  }

  @Delete(':id')
  @UseGuards(LaporanGuard)
  async remove(@Param('id') _id: string) {
    await this.laporanService.removeById(_id);
    return { message: 'Laporan berhasil dihapus' };
  }
}
