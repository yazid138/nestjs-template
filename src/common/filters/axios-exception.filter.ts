import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception.response) {
      return res.status(exception.response.status).json({
        statusCode: exception.response.status,
        url: exception.config.url,
        message: exception.response.statusText,
        error: exception.response.data['message'],
      });
    } else if (exception.request) {
      if (exception.code === 'ECONNREFUSED') {
        return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          url: exception.config.url,
          message: "The gateway is either offline or couldn't be reached",
          error: exception.response,
        });
      }
    } else {
      console.log('Error Axios: ', exception.message);
    }
  }
}
