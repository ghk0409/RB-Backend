import { UserRole } from '@/users/infrastructure/db/entity/user.entity';

export interface Payload {
  id: string;
  email: string;
  role: UserRole;
}
