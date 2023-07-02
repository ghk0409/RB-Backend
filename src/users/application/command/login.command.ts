import { ICommand } from '@nestjs/cqrs';

import { LoginDto } from '@/users/interface/dtos/login.dto';

export class LoginCommand implements ICommand {
  constructor(public readonly loginDto: LoginDto) {}
}
