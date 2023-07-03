import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Redis } from 'ioredis';

import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // role을 가져오기 위해 reflector 사용
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );

    // role이 없으면 true (public api)
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const sessionId = request.cookies['sessionId'];

    // Session 체크
    if (sessionId) {
      const isExistedSession = await this.redis.hgetall(sessionId);

      // 요청 session이 존재하지 않으면 false (요청 session이 DB에 존재하지 않으므로 비정상적인 요청)
      if (!isExistedSession) {
        return false;
      }

      // Any role이면 모든 사용자 true
      if (roles.includes('Any')) {
        return true;
      }

      // Session의 role이 요청 role에 포함되어 있으면 true
      return roles.includes(isExistedSession.role);
      // return true;
    } else {
      throw new HttpException('로그인이 필요합니다.', 401);
      // return false;
    }
  }
}
