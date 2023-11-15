import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChunkDocument = HydratedDocument<Chunk>;

@Schema({ timestamps: true })
export class Chunk {
  @Prop()
  data: Buffer;

  @Prop()
  type: string;

  @Prop()
  size: number;
}

export const ChunkSchema = SchemaFactory.createForClass(Chunk);
