import * as mongoose from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export const LaporanSchema = new mongoose.Schema({
  description: String,
  role: {
    type: String,
    enum: [Role.User, Role.Admin],
  },
});
