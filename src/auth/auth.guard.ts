import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Redis } from 'ioredis';

import { IUserRepository } from '@/users/domain/repository/iuser.repository';

import { AuthService } from './auth.service';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @Inject('AuthService')
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
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
    const token = request.headers['rb-token'];

    if (token) {
      const decoded = await this.authService.verify(token.toString());

      if (
        typeof decoded === 'object' &&
        Object.prototype.hasOwnProperty.call(decoded, 'id')
      ) {
        const user = await this.userRepository.findById(decoded.id);

        if (!user) {
          return false;
        }

        request.user = user;

        // private resolver에서 모두 접근 가능한 resolver인 경우
        if (roles.includes('Any')) {
          return true;
        }
        // roles에 해당 user의 role이 있는지 확인
        return roles.includes(user.getRole());
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
