import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 (프론트엔드와 연결하기 위함)
  app.enableCors();
  // production 환경에서는 origin을 프론트엔드 도메인으로 설정해야 함
  // app.enableCors({
  //   // origin: 'https://randb.vercel.app/',
  //   origin: true,
  //   credentials: true,
  // });

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(4000);
}
bootstrap();
