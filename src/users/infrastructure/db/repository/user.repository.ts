import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/users/domain/repository/iuser.repository';
import { DataSource, Repository } from 'typeorm';

import { UserEntity, UserRole } from '../entity/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
  ) {}

  // 유저 생성 (저장)
  async save(
    id: string,
    email: string,
    password: string,
    name: string,
    signupVerifyToken: string,
    role: UserRole,
  ): Promise<void> {
    this.dataSource.transaction(async (manager) => {
      // user entity 객체 생성
      const user = new UserEntity();

      // user entity 객체에 값 할당
      user.id = id;
      user.email = email;
      user.password = password;
      user.name = name;
      user.signupVerifyToken = signupVerifyToken;
      user.role = role;

      await manager.save(user);
    });
  }

  // 유저 이메일 조회
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  // 유저 ID 조회
  async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }
}
