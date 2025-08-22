import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorPayload } from '@repo/dto';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod';
import { messages } from 'messages';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string;

    // ZodValidationException 처리
    if (exception instanceof ZodValidationException) {
      const zodError = exception.getZodError();
      if (zodError instanceof ZodError && zodError.issues.length > 0) {
        // 첫 번째 에러 메시지를 사용
        const firstError = zodError.issues[ 0 ];
        message = firstError.message || messages.users.profileValidationFailed;
      }
      else {
        message = messages.users.profileValidationFailed;
      }
    }
    else {
      // 기존 에러 처리
      const responseMessage = typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as { message?: string | string[] }).message || 'Internal server error';
      message = Array.isArray(responseMessage)
        ? responseMessage.join(', ')
        : responseMessage;
    }

    const errorPayload: ErrorPayload = {
      status,
      message: Array.isArray(message)
        ? message.join(', ')
        : message,
    };

    response.status(status).json(errorPayload);
  }
}
