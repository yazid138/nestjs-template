import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { LevelEnum } from '../enums/level.enum';

export type LogDocument = HydratedDocument<Log>;

export class Meta {
  @Prop()
  os?: string;

  @Prop()
  ip?: string;

  @Prop()
  userAgent?: string;

  @Prop()
  method?: string;

  @Prop()
  path?: string;
}

@Schema({ timestamps: true })
export class Log {
  @Prop()
  message: string;

  @Prop()
  level: LevelEnum;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user?: User | Types.ObjectId;

  @Prop()
  meta?: Meta;

  constructor(
    level: LevelEnum,
    message: string,
    user?: User | Types.ObjectId,
    meta?: Meta,
  ) {
    this.message = message;
    this.level = level;
    this.user = user;
    this.meta = meta;
  }
}

export const LogSchema = SchemaFactory.createForClass(Log);
