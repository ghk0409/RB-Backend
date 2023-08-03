import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { UserRole } from '../infrastructure/db/entity/user.entity';
import { CreateUserEvent } from './create-user.event';
import { User } from './user';

@Injectable()
export class UserFactory {
  constructor(private readonly eventBus: EventBus) {}
  // 유저 객체 생성 (DTO -> 도메인 객체)
  create(
    id: string,
    email: string,
    password: string,
    name: string,
    signupVerifyToken: string,
    role: UserRole,
  ): User {
    const user = new User(id, email, password, name, signupVerifyToken, role);

    // 인증 메일 발송 이벤트
    this.eventBus.publish(new CreateUserEvent(email, signupVerifyToken));

    return user;
  }

  // 유저 객체 복원 (도메인 객체 -> DTO)
  reconstitute(
    id: string,
    email: string,
    password: string,
    name: string,
    signupVerifyToken: string,
    role: UserRole,
  ): User {
    return new User(id, email, password, name, signupVerifyToken, role);
  }
}
