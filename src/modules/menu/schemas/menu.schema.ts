import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MenuDocument = HydratedDocument<Menu>;

export class SubMenu {
  @Prop()
  path: string;

  @Prop()
  name: string;

  @Prop()
  icon?: string;
}

export class MenuItem {
  @Prop()
  path?: string;

  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop()
  subMenu?: SubMenu[];
}

@Schema()
export class Menu {
  @Prop()
  name: string;

  @Prop()
  menuItems: MenuItem[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
