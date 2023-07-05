import { ICommand } from '@nestjs/cqrs';

import { User } from '@/users/domain/user';
import { UpdateUserDto } from '@/users/interface/dtos/updateUser.dto';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly authUser: User,
    public readonly updateUserDto: UpdateUserDto,
  ) {}
}
