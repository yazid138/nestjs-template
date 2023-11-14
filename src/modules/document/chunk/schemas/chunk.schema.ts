import { Schema } from 'mongoose';

export const ChunkSchema = new Schema({
  data: Buffer,
  type: String,
  size: Number,
});
