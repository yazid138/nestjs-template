import { Provider } from '@nestjs/common';
import { MONGO_CONNECTION } from '../../../database/database.provider';
import { Mongoose } from 'mongoose';
import { ChunkSchema } from './schemas/chunk.schema';

export const CHUNK_MODEL = 'CHUNK_MODEL';

export const chunkModelProvider: Provider = {
  provide: CHUNK_MODEL,
  useFactory: (connection: Mongoose) => connection.model('Chunk', ChunkSchema),
  inject: [MONGO_CONNECTION],
};
