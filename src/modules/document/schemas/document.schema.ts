import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Chunk } from './chunk.schema';

export type DocDocument = HydratedDocument<Document>;

@Schema({ timestamps: true })
export class Document {
  @Prop()
  name: string;

  @Prop()
  path: string;

  @Prop()
  type: string;

  @Prop({ type: Types.ObjectId, ref: Chunk.name })
  chunk: Chunk;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
