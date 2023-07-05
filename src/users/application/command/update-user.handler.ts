import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor() {}

  async execute(command: UpdateUserCommand): Promise<any> {
    const {
      authUser,
      updateUserDto: { name, password, role },
    } = command;

    return {
      name,
      password,
      role,
    };
  }
}
