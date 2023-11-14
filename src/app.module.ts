import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { configValidationSchema } from './config/config.schema';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import Winston from 'winston';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { MyContext } from './common/context/my-context';
import { LaporanModule } from './modules/laporan/laporan.module';
import { DocumentModule } from './modules/document/document.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

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
    TerminusModule,
    WinstonModule.forRoot({
      level: 'warn',
      format: Winston.format.printf((info) => {
        return JSON.stringify({
          ...info,
          date: new Date().toISOString(),
        });
      }),
      transports: [
        new WinstonDailyRotateFile({
          dirname: 'logs',
          zippedArchive: true,
          filename: 'errors-%DATE%.log',
          maxFiles: '14d',
          maxSize: '5m',
        }),
      ],
    }),
    AuthModule,
    UsersModule,
    LaporanModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
