import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { MailModule } from './common/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { PasswordResetService } from './password-reset/password-reset.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'treinaweb',
      database: 'app-aa',
      entities: [join(__dirname, '**/*entity.{ts,js}')],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PasswordResetModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
