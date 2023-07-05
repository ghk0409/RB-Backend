import { PickType } from '@nestjs/swagger';

import { UserEntity } from '@/users/infrastructure/db/entity/user.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'name',
  'password',
  'role',
]) {}
