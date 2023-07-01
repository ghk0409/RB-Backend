import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/users/domain/repository/iuser.repository';
import { UserFactory } from 'src/users/domain/user.factory';
import { ulid } from 'ulid';
import * as uuid from 'uuid';

import { CreateAccountCommand } from './create-accout.command';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async execute(command: CreateAccountCommand): Promise<any> {
    const {
      createAccountDto: { email, password, name, role },
    } = command;

    console.log('111111', email, password, name);
    // TODO: 이메일 중복 체크 (가입 유무)

    const id = ulid();
    const signupVerifyToken = uuid.v4();

    // 유저 DB 저장
    await this.userRepository.save(
      id,
      email,
      password,
      name,
      signupVerifyToken,
      role,
    );

    this.userFactory.create(id, email, password, name, signupVerifyToken, role);
  }
}
