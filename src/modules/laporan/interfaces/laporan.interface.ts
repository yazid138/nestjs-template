import { Document, Types } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export interface Laporan extends Document<Types.ObjectId> {
  description: string;
  readonly role: Role;
  readonly document: Types.ObjectId;
  readonly createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}
