import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { UserEntity } from '@/users/infrastructure/db/entity/user.entity';

@Injectable()
export class SessionService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  // Session 체크
  async checkSession(key: string): Promise<boolean> {
    const isExistedSession = await this.redis.hget(key, 'id');
    const isExist = await this.redis.hexists(key, 'id');

    if (isExistedSession) {
      return true;
    }
    return false;
  }

  // Session 저장
  async setUserSession(sessionId: string, user: UserEntity): Promise<number> {
    // Session 저장
    await this.redis.hset(sessionId, {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Session 만료 시간 설정 (초 * 분 * 시 * 일)
    await this.redis.expire(sessionId, 60 * 60 * 24 * 1);

    return +user.id;
  }
}
