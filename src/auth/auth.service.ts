import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { Payload } from '@/common/interface/payload.interface';

@Injectable()
export class AuthService {
  private readonly jwtSecretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.jwtSecretKey = this.configService.get<string>('JWT_SECRET_KEY');
  }
  // JWT 토큰 생성
  async sign(payload: Payload): Promise<string> {
    return jwt.sign(payload, this.jwtSecretKey, {
      expiresIn: '1d',
    });
  }

  // JWT 토큰 검증
  async verify(token: string): Promise<any> {
    return jwt.verify(token, this.jwtSecretKey);
  }
}
