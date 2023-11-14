import { Provider } from '@nestjs/common';
import { MONGO_CONNECTION } from '../../database/database.provider';
import { Mongoose } from 'mongoose';
import { DocumentSchema } from './schemas/document.schema';

export const DOCUMENT_MODEL = 'DOCUMENT_MODEL';

export const documentModelProvider: Provider = {
  provide: DOCUMENT_MODEL,
  useFactory: (connection: Mongoose) =>
    connection.model('Document', DocumentSchema),
  inject: [MONGO_CONNECTION],
};
