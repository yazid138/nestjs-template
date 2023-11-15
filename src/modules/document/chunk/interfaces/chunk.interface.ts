import { Document, Types } from 'mongoose';

export interface Chunk extends Document<Types.ObjectId> {
  readonly data: Buffer;
  readonly type: string;
  readonly size: number;
}
