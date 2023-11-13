import { HttpException, Logger } from '@nestjs/common';

interface ResponseObject {
  statusCode: number;
  message: string;
  error?: string;
}

export class AxiosException extends HttpException {
  constructor(axiosError: any) {
    const response: ResponseObject = {
      statusCode: 500,
      message: 'Internal Server Error',
    };

    if (axiosError.response) {
      response.statusCode = axiosError.response.data.statusCode;
      response.message = axiosError.response.data.message;
      response.error = axiosError.response.data.error;
    } else if (axiosError.request) {
      if (axiosError.code === 'ECONNREFUSED') {
        response.statusCode = 503;
        response.message =
          "The gateway is either offline or couldn't be reached";
      }
    } else {
      Logger.error('Error Axios: ', axiosError.message);
    }

    super(response, response.statusCode);
  }
}
