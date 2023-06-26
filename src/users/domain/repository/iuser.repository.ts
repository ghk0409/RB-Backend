import { UserRole } from 'src/users/infrastructure/db/entity/user.entity';
import { CreateAccountDto } from 'src/users/interface/dtos/createAccount.dto';

export interface IUserRepository {
    // 유저 생성
    save(
        id: string,
        email: string,
        password: string,
        name: string,
        signupVerifyToken: string,
        role: UserRole,
    ): Promise<void>;
}
