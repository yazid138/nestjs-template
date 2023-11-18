import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';
import { hash } from '../../../utils/hash';
import { Menu } from '../../menu/schemas/menu.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Role.User })
  role: Role;

  @Prop({
    type: [Types.ObjectId],
    ref: Menu.name,
  })
  menu: Menu[] | Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password);
  this.menu = [new Types.ObjectId('6558f75fb291f4f6ad719dc6')];
  return next();
});
