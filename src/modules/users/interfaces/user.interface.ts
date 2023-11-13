import { Document } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export interface User extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;
}
