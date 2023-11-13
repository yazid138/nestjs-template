import * as mongoose from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: Role.User,
    enum: [Role.User, Role.Admin],
  },
});
