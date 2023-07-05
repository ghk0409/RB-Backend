import { ICommand } from '@nestjs/cqrs';

import { CreateUserDto } from '@/users/interface/dtos/createUser.dto';

export class CreateUserCommand implements ICommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
