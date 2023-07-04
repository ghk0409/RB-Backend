import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SessionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env' : '.env',
    }),
    CommonModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
  ],
})
export class AppModule {}
