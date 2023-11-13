import { Provider } from '@nestjs/common';
import { GreetingSchema } from './schemas/greeting.schema';
import { MONGO_CONNECTION } from '../../database/database.provider';

export const GREETING_MODEL = 'GREETING_MODEL';

export const greetingModelProvider: Provider = {
  provide: GREETING_MODEL,
  useFactory: (connection) => connection.model('Greeting', GreetingSchema),
  inject: [MONGO_CONNECTION],
};
