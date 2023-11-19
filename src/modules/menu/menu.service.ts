import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './schemas/menu.schema';
import { Model, Types } from 'mongoose';
import { Seeder } from 'nestjs-seeder';

@Injectable()
export class MenuService implements Seeder {
  constructor(
    @InjectModel(Menu.name) private readonly menuModel: Model<Menu>,
  ) {}

  drop() {
    return this.menuModel.deleteOne({ _id: '6558f75fb291f4f6ad719dc6' }).exec();
  }

  seed() {
    const createMenu = new this.menuModel({
      _id: new Types.ObjectId('6558f75fb291f4f6ad719dc6'),
      name: 'default',
      menuItems: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: 'fas fa-dashboard',
        },
        {
          name: 'Menu 1',
          path: '/menu1',
          icon: 'fas fa-file-alt',
        },
        {
          name: 'Menu 2',
          icon: 'fas fa-file',
          subMenu: [
            {
              name: 'SubMenu 1',
              path: '/menu2/submenu1',
            },
            {
              name: 'SubMenu 2',
              path: '/menu2/submenu3',
            },
          ],
        },
      ],
    });
    return createMenu.save();
  }
}
