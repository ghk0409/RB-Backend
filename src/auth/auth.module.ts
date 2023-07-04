import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [],
  providers: [
    // {
    //   provide: 'AuthService',
    //   useClass: AuthService,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  exports: [],
})
export class AuthModule {}
