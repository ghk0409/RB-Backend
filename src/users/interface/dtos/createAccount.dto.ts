import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/users/infrastructure/db/entity/user.entity';

export class CreateAccountDto extends PickType(UserEntity, [
    'email',
    'name',
    'password',
    'role',
]) {}
