import { Role } from '../../auth/enums/role.enum';
import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  },
);
