import { Document } from 'mongoose';

export interface Greeting extends Document {
  readonly value: string;
}
