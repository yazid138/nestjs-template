import { Role } from '../../auth/enums/role.enum';
import { Schema, Types } from 'mongoose';

export const LaporanSchema = new Schema(
  {
    description: String,
    document: {
      type: Types.ObjectId,
      ref: 'Document',
    },
    role: {
      type: String,
      enum: [Role.User, Role.Admin],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
