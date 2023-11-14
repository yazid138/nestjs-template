import { Document } from 'mongoose';

export interface Chunk extends Document {
  readonly data: Buffer;
  readonly type: string;
  readonly size: number;
}
