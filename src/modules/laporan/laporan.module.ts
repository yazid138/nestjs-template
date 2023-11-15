import { Module } from '@nestjs/common';
import { LaporanController } from './laporan.controller';
import { LaporanService } from './laporan.service';
import { AuthModule } from '../auth/auth.module';
import { DocumentModule } from '../document/document.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Laporan, LaporanSchema } from './schemas/laporan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Laporan.name, schema: LaporanSchema }]),
    AuthModule,
    DocumentModule,
  ],
  controllers: [LaporanController],
  providers: [LaporanService],
})
export class LaporanModule {}
