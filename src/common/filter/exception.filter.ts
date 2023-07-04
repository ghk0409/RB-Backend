import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: Exception, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     console.log('112321321313', exception);
//     response.status(exception.getStatus()).json({
//       status: 'Error',
//       statusCode: exception.getStatus(),
//       message: exception.message,
//     });
//   }
// }

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : exception.toString();

    response.status(status).json({
      status: 'Error',
      statusCode: status,
      message: message,
    });
  }
}
