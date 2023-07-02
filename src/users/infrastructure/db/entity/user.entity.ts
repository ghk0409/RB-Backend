import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsString, MaxLength } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Realtor = 'Realtor',
}

@Entity({ name: 'users' })
export class UserEntity extends CoreEntity {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column({ length: 60, unique: true })
  @IsEmail()
  @MaxLength(60)
  email!: string;

  @Column({ length: 60 })
  @IsString()
  @MaxLength(60)
  password!: string;

  @Column({ nullable: true, length: 50 })
  name?: string;

  @Column({ length: 60 })
  @IsString()
  @MaxLength(60)
  signupVerifyToken: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  // 패스워드 해싱
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    // 패스워드 있을 경우에만 실행 (프로필 수정에 패스워드 없을 떄 실행 방지)
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
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
