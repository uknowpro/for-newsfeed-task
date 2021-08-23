import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionFormatter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as any;

    response
      .status(status)
      .json({
        errorType: errorResponse.name || 'UnknownException',
        errorMessage: errorResponse.message || 'Internal server error.',
        errors: errorResponse.customErrors || []
      })
  }
}
