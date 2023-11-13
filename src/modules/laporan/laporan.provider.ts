import { LaporanSchema } from './schemas/laporan.schema';
import { Provider } from '@nestjs/common';
import { MONGO_CONNECTION } from '../../database/database.provider';
import { Mongoose } from 'mongoose';

export const LAPORAN_MODEL = 'LAPORAN_MODEL';

export const laporanModelProvider: Provider = {
  provide: LAPORAN_MODEL,
  useFactory: (connection: Mongoose) =>
    connection.model('Laporan', LaporanSchema, 'laporan'),
  inject: [MONGO_CONNECTION],
};
