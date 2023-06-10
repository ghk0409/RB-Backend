import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
    @Query((returns) => String)
    test(): string {
        console.log('test');
        return '테스트 중입니당';
    }
}
