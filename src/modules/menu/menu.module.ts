import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuSchema } from './schemas/menu.schema';
import { MenuService } from './menu.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Menu',
        schema: MenuSchema,
      },
    ]),
  ],
  providers: [MenuService],
})
export class MenuModule {}
