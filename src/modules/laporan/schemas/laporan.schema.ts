import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';
import { User } from '../../users/schemas/user.schema';
import { Document } from '../../Document/schemas/document.schema';

export type LaporanDocument = HydratedDocument<Laporan>;

@Schema({ timestamps: true, collection: 'laporan' })
export class Laporan {
  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: Document.name })
  document: Document | Types.ObjectId;

  @Prop()
  role: Role;

  @Prop()
  password: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy: User | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  updatedBy: User | Types.ObjectId;
}

export const LaporanSchema = SchemaFactory.createForClass(Laporan);
