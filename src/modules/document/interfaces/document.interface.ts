import { Document as MongoDocument } from 'mongoose';

export interface Document extends MongoDocument {
  readonly name: string;
  readonly path: string;
  readonly type: string;
}
