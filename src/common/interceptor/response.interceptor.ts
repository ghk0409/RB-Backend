import { Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';

class Response<T> {
  status: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor<Response<any>> {
  intercept(context, next) {
    return next
      .handle()
      .pipe(map((data) => ({ status: 'success', data: data ?? true })));
  }
}
