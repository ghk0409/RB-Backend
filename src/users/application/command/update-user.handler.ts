import { HttpException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IUserRepository } from '@/users/domain/repository/iuser.repository';

import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    const { authUser, updateUserDto } = command;

    const user = await this.userRepository.findById(authUser.getId());

    if (!user) {
      throw new HttpException('존재하지 않는 유저입니다.', 400);
    }

    await this.userRepository.update(authUser.getId(), updateUserDto);
  }
}
