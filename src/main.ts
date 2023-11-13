import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = new Logger('NestApplication');

  app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

  // Config Service
  const configService = app.get(ConfigService);

  // Global prefix
  const prefix = configService.get('PREFIX_NAME', 'PREFIX_NAME');
  app.setGlobalPrefix(prefix);

  // Compression
  app.use(compression());

  // Enable Helmet
  app.use(helmet());

  // Enable Cookie-Parser
  app.use(cookieParser());

  // set CORS
  app.enableCors();

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Enable Auto Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true, // Temporary Solve: SQL Injection and Cross-site Scripting in class-validator - https://github.com/advisories/GHSA-fj58-h2fr-3pp2
    }),
  );

  // Global Interceptors
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('APP_NAME'))
    .setDescription(`The ${configService.get('APP_NAME')} API description`)
    .setVersion('1.0')
    .addServer(`/${prefix}`)
    .addCookieAuth('auth-cookie')
    .build();

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    ignoreGlobalPrefix: true,
  };

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerDocumentOptions,
  );

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: `${configService.get('APP_NAME')} API Docs`,
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  };

  SwaggerModule.setup(`/${prefix}/docs`, app, document, customOptions);

  await app.listen(parseInt(configService.get('PORT', '3000'), 10));
  logger.verbose(`Application is running on: ${await app.getUrl()}/${prefix}`);
  logger.verbose(`Swagger is running on: ${await app.getUrl()}/${prefix}/docs`);
}

bootstrap();
