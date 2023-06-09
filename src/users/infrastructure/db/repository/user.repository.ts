import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/users/domain/repository/iuser.repository';
import { DataSource, Repository } from 'typeorm';

import { User } from '@/users/domain/user';
import { UserFactory } from '@/users/domain/user.factory';
import { UpdateUserDto } from '@/users/interface/dtos/updateUser.dto';

import { UserEntity, UserRole } from '../entity/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
    private readonly userFactory: UserFactory,
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
  async findByEmail(email: string): Promise<User> {
    const userEntity = await this.userRepository.findOne({ where: { email } });

    if (!userEntity) {
      return null;
    }

    const { id, password, name, signupVerifyToken, role } = userEntity;

    const user = this.userFactory.reconstitute(
      id,
      email,
      password,
      name,
      signupVerifyToken,
      role,
    );

    return user;
  }

  // 유저 ID 조회
  async findById(id: string): Promise<User> {
    const userEntity = await this.userRepository.findOne({ where: { id } });

    if (!userEntity) {
      return null;
    }

    const { email, name, signupVerifyToken, password, role } = userEntity;

    const user = this.userFactory.reconstitute(
      id,
      email,
      password,
      name,
      signupVerifyToken,
      role,
    );

    return user;
  }

  // 유저 수정
  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(UserEntity, { where: { id } });
      const { name, password, role } = updateUserDto;

      if (name) {
        user.name = name;
      }

      if (password) {
        user.password = password;
      }

      if (role) {
        user.role = role;
      }

      await manager.save(user);
    });
  }
}
