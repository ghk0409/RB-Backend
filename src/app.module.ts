import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
    imports: [UsersModule, AuthModule, CommonModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
