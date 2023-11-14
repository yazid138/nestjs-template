import { Module } from '@nestjs/common';
import { LaporanController } from './laporan.controller';
import { LaporanService } from './laporan.service';
import { laporanModelProvider } from './laporan.provider';
import { DatabaseModule } from '../../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { DocumentModule } from '../document/document.module';

@Module({
  imports: [DatabaseModule, AuthModule, DocumentModule],
  controllers: [LaporanController],
  providers: [LaporanService, laporanModelProvider],
})
export class LaporanModule {}
