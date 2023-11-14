import * as mongoose from 'mongoose';
import { Role } from '../../auth/enums/role.enum';
import { Types } from 'mongoose';

export const LaporanSchema = new mongoose.Schema({
  description: String,
  dokumen: {
    type: Types.ObjectId,
    ref: 'Document',
  },
  role: {
    type: String,
    enum: [Role.User, Role.Admin],
  },
});
