import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '@/auth/auth.service';

import { CreateUserHandler } from './application/command/create-user.handler';
import { LoginHandler } from './application/command/login.handler';
import { UpdateUserHandler } from './application/command/update-user.handler';
import { GetUserInfoHandler } from './application/query/get-user-info.handler';
import { UserFactory } from './domain/user.factory';
import { UserEntity } from './infrastructure/db/entity/user.entity';
import { UserRepository } from './infrastructure/db/repository/user.repository';
import { UsersController } from './interface/users.controller';

const repository = [
  {
    provide: 'UserRepository',
    useClass: UserRepository,
  },
];

const entity = [UserEntity];

const commandHandler = [CreateUserHandler, LoginHandler, UpdateUserHandler];
const queryHandler = [GetUserInfoHandler];

const factory = [UserFactory];

const service = [
  {
    provide: 'AuthService',
    useClass: AuthService,
  },
  // {
  //   provide: 'SessionService',
  //   useClass: SessionService,
  // },
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(entity)],
  controllers: [UsersController],
  providers: [
    ...commandHandler,
    ...repository,
    ...factory,
    ...service,
    ...queryHandler,
  ],
  // exports: [...repository],
})
export class UsersModule {}
