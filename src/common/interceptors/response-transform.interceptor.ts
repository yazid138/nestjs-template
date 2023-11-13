import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { MyContext } from '../context/my-context';
import { RequestContext } from '@medibloc/nestjs-request-context';

export interface Response<T> {
  statusCode: number;
  message?: string;
  data?: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<any>();
    const req = ctx.getRequest<Request>();
    const reqCtx = RequestContext.get<MyContext>();
    reqCtx.body = req.body;
    reqCtx.params = req.params;
    reqCtx.query = req.query;
    return next.handle().pipe(
      map((response) => {
        const { statusCode, message, data } = response;
        const code = statusCode || res.statusCode;
        res.status(code);
        return {
          statusCode: code,
          message,
          data: data || response,
        };
      }),
    );
  }
}
