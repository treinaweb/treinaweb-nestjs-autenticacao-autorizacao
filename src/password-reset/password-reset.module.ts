import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/common/mail/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PasswordReset } from './entities/password-reset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PasswordReset])],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, UsersService, MailService],
})
export class PasswordResetModule {}
