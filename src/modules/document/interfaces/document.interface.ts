import { Document as MongoDocument, Types } from 'mongoose';

export interface Document extends MongoDocument<Types.ObjectId> {
  readonly name: string;
  readonly path: string;
  readonly type: string;
}
