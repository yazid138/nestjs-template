import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let response: {
      statusCode: number;
      message?: string;
      type?: string;
      error?: string | string[];
    } = {
      statusCode: status,
      // type: exception.name,
    };

    switch (exception.name) {
      case 'BadRequestException': {
        if (typeof exception.getResponse() === 'string')
          response.message = exception.getResponse() as string;
        else {
          const res = exception.getResponse() as any;
          if (exception.message === 'Bad Request Exception')
            response = {
              statusCode: res.statusCode,
              message: res.error,
              error: res.message,
            };
          else response.message = res.message;
        }
        break;
      }
      default: {
        response.message = exception.message;
        break;
      }
    }
    res.status(status).json(response);
  }
}
