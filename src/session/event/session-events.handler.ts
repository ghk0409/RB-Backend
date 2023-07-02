import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SessionIdSetEvent } from './session-id-set.event';
import { Response } from 'express';

@EventsHandler()
export class SessionEventsHandler implements IEventHandler<SessionIdSetEvent> {
  // constructor(private readonly response: Response) {}

  async handle(event: SessionIdSetEvent) {
    const { sessionId } = event;

    // this.response.cookie('sessionId', sessionId, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: 1000 * 60 * 60 * 24 * 1, // 1일
    // });
  }
}
