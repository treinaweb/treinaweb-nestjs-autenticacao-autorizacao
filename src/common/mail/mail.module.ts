import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.mailgun.org',
          secure: false,
          port: 587,
          auth: {
            user: 'username',
            pass: 'password',
          },
          ignoreTLS: true,
        },
        defaults: {
          from: '"TW" <noreply@tw.com>',
        },
        template: {
          dir: '/Users/wesleygado/Documents/treinaweb/NestJS - Autenticação e Autorização/app-nestjs/src/common/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
