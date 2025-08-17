import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { SuccessPayload } from '@repo/dto';

@Injectable()
export class SuccessInterceptor<T>
implements NestInterceptor<T, SuccessPayload<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<SuccessPayload<T>> {
    const response = context.switchToHttp().getResponse<Response>();
    const status = response.statusCode;

    return next.handle().pipe(
      map((data: T) => ({
        status,
        data,
      }))
    );
  }
}
