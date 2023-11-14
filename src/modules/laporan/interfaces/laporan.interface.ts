import { Document } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export interface Laporan extends Document {
  description: string;
  readonly role: Role;
  readonly dokumen: string;
}
