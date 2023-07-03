import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';

import { SessionEventsHandler } from './event/session-events.handler';
import { SessionService } from './session.service';

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
