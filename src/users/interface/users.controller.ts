import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';
import { AuthUser } from '@/auth/auth-user.decorator';
import { Role } from '@/auth/role.decorator';
import { EmailService } from '@/email/email.service';

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
    @Inject('MailService')
    private readonly emailService: EmailService,
    private readonly eventBus: EventBus,
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

  // 인증 메일에서 버튼 누르면 프론트로 이동하고 거기서 바로 이 API를 호출해서 인증 완료 + 로그인(jwt 토큰 발급)
  @Post('verify-email')
  async verifyEmail(@Body() { email }: { email: string }): Promise<void> {}
}
