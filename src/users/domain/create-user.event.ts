import { IEvent } from '@nestjs/cqrs';

import { CqrsEvent } from './cqrs.event';

export class CreateUserEvent extends CqrsEvent implements IEvent {
  constructor(readonly to: string, readonly verifyToken: string) {
    console.log('123123123', to, verifyToken);
    super(CreateUserEvent.name);
  }
}
