import { Injectable } from '@nestjs/common';

import { UserRole } from '../infrastructure/db/entity/user.entity';
import { User } from './user';

@Injectable()
export class UserFactory {
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

    // TODO: 추후 이벤트 버스를 통해 이벤트 발행 (인증 이메일 발송)

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
