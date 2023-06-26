import { Module } from '@nestjs/common';

import { UsersController } from './interface/users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAccountHandler } from './application/command/create-account.handler';
import { UserRepository } from './infrastructure/db/repository/user.repository';
import { UserEntity } from './infrastructure/db/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const repository = [
    {
        provide: 'UserRepository',
        useClass: UserRepository,
    },
];

const entity = [UserEntity];

const commandHandler = [CreateAccountHandler];

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature(entity)],
    controllers: [UsersController],
    providers: [...commandHandler, ...repository],
})
export class UsersModule {}
