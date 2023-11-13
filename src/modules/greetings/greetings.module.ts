import { Module } from '@nestjs/common';
import { GreetingsService } from './greetings.service';
import { GreetingsController } from './greetings.controller';
import { DatabaseModule } from '../../database/database.module';
import { greetingModelProvider } from './greetings.provider';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [GreetingsController],
  providers: [GreetingsService, greetingModelProvider],
})
export class GreetingsModule {}
