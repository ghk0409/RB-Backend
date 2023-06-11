import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
    @Query((returns) => String)
    test(): string {
        console.log('test');
        return '테스트 중입니당';
    }

    @Query((returns) => String)
    test2(): string {
        return '깃헙 액션 연동 성공!!!!';
    }
}
