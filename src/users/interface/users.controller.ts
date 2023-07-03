import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';

import { CreateAccountCommand } from '../application/command/create-accout.command';
import { LoginCommand } from '../application/command/login.command';
import { CreateAccountDto } from './dtos/createAccount.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('test1')
  test(): string {
    console.log('test');
    return '테스트 중입니당';
  }

  @Get('test2')
  test2(): string {
    return '깃헙 액션 연동 성공!!!!';
  }

  // 회원가입
  @Post('create-account')
  async createAccout(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<boolean> {
    const command = new CreateAccountCommand(createAccountDto);

    return this.commandBus.execute(command);
  }

  // 로그인
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() response: Response,
  ): Promise<any> {
    const command = new LoginCommand(loginDto);

    const sessionId = await this.commandBus.execute(command);

    response.cookie('sessionId', sessionId, {
      domain: '.randb.vercel.app',
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1일
      // sameSite: 'none',
    });

    return response.send({
      status: 'success',
      data: {
        sessionId,
      },
    });
  }
}
