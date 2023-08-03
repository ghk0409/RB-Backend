import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CreateUserEvent } from '@/users/domain/create-user.event';

import { IEmailService } from '../adapter/iemail.service';

@EventsHandler(CreateUserEvent)
export class UserEventHandler implements IEventHandler<CreateUserEvent> {
  constructor(
    @Inject('MailService')
    private readonly mailService: IEmailService,
  ) {}

  // 이벤트 핸들러는 한 번에 여러 이벤트를 받을 수 있음 (다른 커맨드/쿼리 핸들러와 다름)
  async handle(event: CreateUserEvent) {
    switch (event.name) {
      case CreateUserEvent.name: {
        const { to, verifyToken } = event;

        await this.mailService.sendVerifyEmail(to, verifyToken);
        break;
      }
      default: {
        break;
      }
    }
  }
}
