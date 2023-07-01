import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateAccountHandler } from './application/command/create-account.handler';
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

const commandHandler = [CreateAccountHandler];

const factory = [UserFactory];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(entity)],
  controllers: [UsersController],
  providers: [...commandHandler, ...repository, ...factory],
})
export class UsersModule {}
