import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRole } from '../infrastructure/db/entity/user.entity';

// User 도메인 클래스
export class User {
  constructor(
    private id: string,
    private email: string,
    private password: string,
    private name: string,
    private signupVerifyToken: string,
    private role: UserRole,
  ) {}

  // 유저 ID 반환 (id는 ulid 값)
  getId(): Readonly<string> {
    return this.id;
  }
  // 유저 Email 반환
  getEmail(): Readonly<string> {
    return this.email;
  }
  // 유저 Name 반환
  getName(): Readonly<string> {
    return this.name;
  }
  // 유저 Role 반환
  getRole(): Readonly<UserRole> {
    return this.role;
  }

  // 패스워드 체크
  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
