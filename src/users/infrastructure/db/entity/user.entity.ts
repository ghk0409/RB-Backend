import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
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
  @ApiProperty({
    example: '01H4DTHAQNXKF9WFZ2GC6Y03D2',
    description: '유저 ID(ulid)',
  })
  id: string;

  @Column({ length: 60, unique: true })
  @IsEmail()
  @MaxLength(60)
  @ApiProperty({ example: 'test@test.com', description: '유저 이메일' })
  email!: string;

  @Column({ length: 60 })
  @IsString()
  @MaxLength(60)
  @ApiProperty({ example: 'test1234', description: '유저 패스워드' })
  password!: string;

  @Column({ nullable: true, length: 50, default: null })
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '테스터', description: '유저 이름' })
  name?: string;

  @Column({ length: 60 })
  @IsString()
  @MaxLength(60)
  @ApiProperty({
    example: 'a8237uasd988uc@bjhe%ab!ef',
    description: '유저 가입 인증 토큰',
  })
  signupVerifyToken: string;

  @Column({ type: 'enum', enum: UserRole })
  @IsEnum(UserRole)
  @ApiProperty({ example: 'User', description: '유저 권한' })
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
}
