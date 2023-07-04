import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateAccountCommand } from '../application/command/create-accout.command';
import { LoginCommand } from '../application/command/login.command';
import { CreateAccountDto } from './dtos/createAccount.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { Role } from '@/auth/role.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('test1')
  @Role(['Admin'])
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
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const command = new LoginCommand(loginDto);

    const token = await this.commandBus.execute(command);

    return token;
  }
}
