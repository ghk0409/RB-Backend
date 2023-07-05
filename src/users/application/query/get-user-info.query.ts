import { IQuery } from '@nestjs/cqrs';

import { User } from '@/users/domain/user';

export class GetUserInfoQuery implements IQuery {
  constructor(public readonly authUser: User) {}
}
