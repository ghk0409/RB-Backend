import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASS'),
          },
          defaults: {
            from: '"R&B" <no-reply@rbapp.com>', // 이메일 발송자
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(), // handlebars adapter 사용
            options: {
              strict: true,
            },
          },
        },
      }),
    }),
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       // 이메일 계정
    //       user: 'ongstance@gmail.com',
    //       // 이메일 패스워드
    //       pass: 'ytzqevdiyagpeygf',
    //     },
    //   },
    //   defaults: {
    //     from: '"R&B" <no-reply@rbapp.com>', // 이메일 발송자
    //   },
    //   template: {
    //     dir: __dirname + '/templates',
    //     adapter: new HandlebarsAdapter(), // handlebars adapter 사용
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
