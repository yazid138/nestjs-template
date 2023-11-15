import { Schema, Types } from 'mongoose';

export const DocumentSchema = new Schema(
  {
    name: String,
    path: String,
    type: String,
    chunks: { type: Types.ObjectId, ref: 'Chunk' },
  },
  {
    timestamps: true,
  },
);
