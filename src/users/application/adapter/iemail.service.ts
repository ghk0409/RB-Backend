export interface IEmailService {
  sendVerifyEmail(to: string, verifyToken: string): Promise<void>;
}
