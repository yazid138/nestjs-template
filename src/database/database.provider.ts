import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

export const MONGO_CONNECTION = 'MONGO_CONNECTION';

export const databaseProvider: Provider[] = [
  {
    provide: MONGO_CONNECTION,
    useFactory: (configService: ConfigService) =>
      mongoose.connect(configService.get<string>('MONGO_URL')),
    inject: [ConfigService],
  },
];
