import { Payload } from '@/common/interface/payload.interface';

export interface IAuthService {
  sign(payload: Payload): Promise<string>;
  verify(token: string): Promise<any>;
}
