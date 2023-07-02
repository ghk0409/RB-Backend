import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as uuid from 'uuid';

import { AuthService } from '@/auth/auth.service';
import { IUserRepository } from '@/users/domain/repository/iuser.repository';

import { IAuthService } from '../adapter/iauth.service';
import { ISessionService } from '../adapter/isession.service';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('AuthService')
    private readonly authService: IAuthService,
    @Inject('SessionService')
    private readonly sessionService: ISessionService,
  ) {}

  async execute(command: LoginCommand): Promise<any> {
    const {
      loginDto: { email, password },
    } = command;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('가입되지 않은 이메일입니다.');
    }

    const checkPassword = await user.checkPassword(password);
    if (!checkPassword) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    // JWT 토큰 발급
    // const token = await this.authService.sign({
    //   id: user.id,
    //   email: user.email,
    //   role: user.role,
    // });

    // Session 체크
    const checkSession = await this.sessionService.checkSession(user.id);
    if (checkSession) {
      throw new Error('이미 로그인된 사용자입니다.');
    }

    // Session ID 발급
    const sessionId = uuid.v4();
    // Session 저장
    await this.sessionService.setUserSession(sessionId, user);

    // Session ID 쿠키 저장
    // this.eventBus.publish(new SessionIdSetEvent(sessionId));

    return {
      sessionId,
    };
  }
}
