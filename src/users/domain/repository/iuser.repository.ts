import {
  UserEntity,
  UserRole,
} from 'src/users/infrastructure/db/entity/user.entity';

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
  findByEmail(email: string): Promise<UserEntity | undefined>;

  // 유저 ID로 조회
  findById(id: string): Promise<UserEntity | undefined>;
}
