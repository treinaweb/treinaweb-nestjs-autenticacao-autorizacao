import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PasswordReset } from 'src/password-reset/entities/password-reset.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async enviarEmailDeResetDeSenha(passwordReset: PasswordReset) {
    await this.mailerService.sendMail({
      to: 'wesley.gado@treinaweb.com.br',
      from: 'TW <tw@tw.com>',
      subject: 'Solicitação de Reset de Senha',
      template: 'resetar-senha',
      context: {
        link: `http://localhost:3000/confirmacao?token=${passwordReset.token}`,
      },
    });
  }
}
