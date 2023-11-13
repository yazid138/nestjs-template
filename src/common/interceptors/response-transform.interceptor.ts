import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
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
      map((r) => {
        const statusCode = r?.statusCode;
        const code = statusCode || res.statusCode;
        res.status(code);
        const response: Response<any> = {
          statusCode: code,
        };
        if (r?.data) response.data = r.data;
        if (r?.message) response.message = r.message;
        if (!r?.data && !r?.message) response.data = r;
        return response;
      }),
    );
  }
}
