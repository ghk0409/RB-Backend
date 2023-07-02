import { PickType } from '@nestjs/swagger';

import { UserEntity } from '@/users/infrastructure/db/entity/user.entity';

export class LoginDto extends PickType(UserEntity, ['email', 'password']) {}
