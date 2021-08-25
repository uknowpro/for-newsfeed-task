import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { toExceptionConst, errorMessageConst } from '../constants';

@Catch(HttpException)
export class ExceptionFormatter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let errorResponse = exception.getResponse() as any;
    if (errorResponse.message instanceof Array) {
      errorResponse.customErrors = errorResponse.message;
      errorResponse.message = errorResponse.error || '';
    }
    response
      .status(status)
      .json({
        errorType: toExceptionConst(status),
        errorMessage: errorResponse.message || 'Internal server error.',
        errors: errorResponse.customErrors || []
      })
  }
}
