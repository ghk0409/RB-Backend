import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { SessionEventsHandler } from './event/session-events.handler';

const eventHandler = [SessionEventsHandler];

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [SessionService, ...eventHandler],
  exports: [SessionService],
})
export class SessionModule {}
