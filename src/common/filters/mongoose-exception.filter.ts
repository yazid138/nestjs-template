import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongooseError, Error } from 'mongoose';

@Catch(MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    let error: { statusCode: number; message: string };

    switch (exception.name) {
      case Error.DocumentNotFoundError.name: {
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Not Found',
        };
        break;
      }
      // case 'MongooseError': { break; } // general Mongoose error
      // case 'CastError': { break; }
      // case 'DisconnectedError': { break; }
      // case 'DivergentArrayError': { break; }
      // case 'MissingSchemaError': { break; }
      // case Error.ValidatorError.name: { break; }
      // case Error.ValidationError.name: { break; }
      // case 'ObjectExpectedError': { break; }
      // case 'ObjectParameterError': { break; }
      // case 'OverwriteModelError': { break; }
      // case 'ParallelSaveError': { break; }
      // case 'StrictModeError': { break; }
      // case 'VersionError': { break; }
      default: {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Error',
        };
        break;
      }
    }

    res.status(error.statusCode).json(error);
  }
}
