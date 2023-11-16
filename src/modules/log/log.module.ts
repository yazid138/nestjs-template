import { forwardRef, Module } from '@nestjs/common';
import { LogService } from './log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './schemas/log.schema';
import { LogController } from './log.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  providers: [LogService],
  controllers: [LogController],
  exports: [LogService],
})
export class LogModule {}
