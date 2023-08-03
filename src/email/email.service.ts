import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  // private transporter: Mail;

  constructor(
    private readonly mailerService: MailerService,
    // private readonly transport: Mail,
    private readonly configService: ConfigService,
  ) {
    // this.transporter = nodemailer.createTransport({
    //   service: this.configService.get('MAIL_SERVICE'),
    //   host: this.configService.get('MAIL_HOST'),
    //   port: this.configService.get('MAIL_PORT'),
    //   auth: {
    //     user: this.configService.get('MAIL_USER'),
    //     pass: this.configService.get('MAIL_PASS'),
    //   },
    // });
  }

  // 이메일 발송
  async sendVerifyEmail(to: string, verifyToken: string): Promise<any> {
    const baseUrl = this.configService.get('BASE_URL');
    const url = `${baseUrl}/users/verify-email?signUpVerifyToken=${verifyToken}`;

    const mailOpt = {
      to: to,
      from: '"R&B" <no-reply@rbapp.com>',
      subject: '[R&B] 이메일 인증 확인하기',
      html: `
        인증하기 버튼을 누르시면 이메일 인증이 완료됩니다.<br />
        <form action="${url}" method="POST">
          <button type="submit">인증하기</button>
        </form>
      `,
    };

    return await this.mailerService.sendMail(mailOpt);
    // return await this.transporter.sendMail(mailOpt);
  }
}
