import { PartialType, PickType } from '@nestjs/swagger';

import { UserEntity } from '@/users/infrastructure/db/entity/user.entity';

export class UpdateUserDto extends PartialType(
  PickType(UserEntity, ['name', 'password', 'role']),
) {}
