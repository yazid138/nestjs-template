import { UserSchema } from './schemas/user.schema';
import { Provider } from '@nestjs/common';
import { MONGO_CONNECTION } from '../../database/database.provider';

export const USER_MODEL = 'USER_MODEL';

export const userModelProvider: Provider = {
  provide: USER_MODEL,
  useFactory: (connection) => connection.model('User', UserSchema),
  inject: [MONGO_CONNECTION],
};
