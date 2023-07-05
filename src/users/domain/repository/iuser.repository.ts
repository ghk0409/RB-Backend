import { UserRole } from 'src/users/infrastructure/db/entity/user.entity';

import { UpdateUserDto } from '@/users/interface/dtos/updateUser.dto';

import { User } from '../user';

export interface IUserRepository {
  // 유저 생성
  save(
    id: string,
    email: string,
    password: string,
    name: string,
    signupVerifyToken: string,
    role: UserRole,
  ): Promise<void>;

  // 유저 이메일로 조회
  findByEmail(email: string): Promise<User>;

  // 유저 ID로 조회
  findById(id: string): Promise<User>;

  // 유저 수정
  update(id: string, updateUserDto: UpdateUserDto): Promise<void>;
}
