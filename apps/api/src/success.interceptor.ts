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
import { messages } from '@repo/message';

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
      map((data: any) => {
        // data에 message가 포함되어 있으면 해당 메시지를 사용, 아니면 기본 메시지
        const message = data?.message || messages.common.success;
        // data에 message가 포함되어 있으면 data.data를 실제 데이터로 사용
        const responseData = data?.message ? data.data : data;

        return {
          status,
          message,
          data: responseData,
        };
      })
    );
  }
}
