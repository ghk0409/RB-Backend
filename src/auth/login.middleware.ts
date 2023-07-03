import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Redis } from 'ioredis';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  // @Injectable()인 경우에만 inject 가능
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.cookies['sessionId']) {
      const isExistedSession = await this.redis.exists(
        req.cookies['sessionId'],
      );
      if (isExistedSession) {
        throw new HttpException(
          '이미 로그인이 되어 있습니다. 로그아웃을 먼저 해주세요',
          400,
        );
      }
    }
    next();
  }
}
