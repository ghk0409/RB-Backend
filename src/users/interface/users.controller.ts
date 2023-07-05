import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';
import { AuthUser } from '@/auth/auth-user.decorator';
import { Role } from '@/auth/role.decorator';

import { CreateUserCommand } from '../application/command/create-user.command';
import { LoginCommand } from '../application/command/login.command';
import { UpdateUserCommand } from '../application/command/update-user.command';
import { GetUserInfoQuery } from '../application/query/get-user-info.query';
import { User } from '../domain/user';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
@UseGuards(AuthGuard)
@ApiTags('유저 API')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // 회원가입
  @Post('create-account')
  @ApiBody({ type: CreateUserDto })
  async createAccout(@Body() createUserDto: CreateUserDto): Promise<void> {
    const command = new CreateUserCommand(createUserDto);

    return this.commandBus.execute(command);
  }

  // 로그인
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto): Promise<string> {
    const command = new LoginCommand(loginDto);

    const token = await this.commandBus.execute(command);

    return token;
  }

  // 유저 정보 조회
  @Get('profile')
  @Role(['Any'])
  @ApiSecurity('rb-token')
  async userInfo(@AuthUser() authUser: User): Promise<any> {
    const query = new GetUserInfoQuery(authUser);

    const userInfo = await this.queryBus.execute(query);

    return userInfo;
  }

  // 유저 정보 수정
  @Put('profile')
  @Role(['Any'])
  @ApiSecurity('rb-token')
  async updateUserInfo(
    @AuthUser() authUser: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const command = new UpdateUserCommand(authUser, updateUserDto);

    return this.commandBus.execute(command);
  }
}
