import { Document, Types } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export interface User extends Document<Types.ObjectId> {
  readonly name: string;
  readonly email: string;
  password: string;
  readonly role: Role;
}
