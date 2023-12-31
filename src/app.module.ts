import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { configValidationSchema } from './config/config.schema';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { MyContext } from './common/context/my-context';
import { LaporanModule } from './modules/laporan/laporan.module';
import { DocumentModule } from './modules/document/document.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { LogModule } from './modules/log/log.module';
import { UserExistsValidator } from './common/validation/user-exists.validator';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    RequestContextModule.forRoot({
      contextClass: MyContext,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
    }),
    TerminusModule,
    AuthModule,
    UsersModule,
    DocumentModule,
    LaporanModule,
    LogModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [UserExistsValidator],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
