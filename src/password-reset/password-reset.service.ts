import { Injectable } from '@nestjs/common';
import { CreatePasswordResetDto } from './dto/create-password-reset.dto';
import { UpdatePasswordResetDto } from './dto/update-password-reset.dto';
import { UsersService } from 'src/users/users.service';
import { PasswordReset } from './entities/password-reset.entity';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from 'src/common/mail/mail.service';
import { PasswordResetDto } from './dto/password-reset.dto';

@Injectable()
export class PasswordResetService {
  constructor(
    private userService: UsersService,
    @InjectRepository(PasswordReset)
    private passwordResetRepository: Repository<PasswordReset>,
    private mail: MailService,
  ) {}
  async createPasswordReset(createPasswordResetDto: CreatePasswordResetDto) {
    const user = await this.userService.findUserByEmail(
      createPasswordResetDto.email,
    );
    if (user) {
      const passwordReset = new PasswordReset();
      passwordReset.email = createPasswordResetDto.email;
      passwordReset.token = randomUUID();
      await this.passwordResetRepository.save(passwordReset);
      await this.mail.enviarEmailDeResetDeSenha(passwordReset);
    }
  }

  async resetarSenha(newPasswordReset: PasswordResetDto) {
    const passwordReset = await this.passwordResetRepository.findOneBy({
      token: newPasswordReset.token,
    });
    const user = await this.userService.findUserByEmail(passwordReset.email);
    await user.setPassword(newPasswordReset.password);
    await this.userService.update(user);
    await this.passwordResetRepository.delete(passwordReset.id);
  }

  findAll() {
    return `This action returns all passwordReset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordReset`;
  }

  update(id: number, updatePasswordResetDto: UpdatePasswordResetDto) {
    return `This action updates a #${id} passwordReset`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordReset`;
  }
}
