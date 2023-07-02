import { IEvent } from '@nestjs/cqrs';

export class SessionIdSetEvent implements IEvent {
  constructor(public readonly sessionId: string) {}
}
