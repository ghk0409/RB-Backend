import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateAccountCommand } from '../application/command/create-accout.command';
import { CreateAccountDto } from './dtos/createAccount.dto';

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
}
