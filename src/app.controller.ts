import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './common/guards/login.guard';
import { Request, Response } from 'express';
import { AuthExceptionFilter } from './common/filters/auth-exception.filter';
import { GetUser } from './common/decorators/get-user.decorator';
import { User } from './users/entities/user.entity';
import { TipoUsuario } from './users/enum/tipo-usuario.enum';
import { RolesGuard } from './common/guards/roles.guard';
import { Roles } from './common/decorators/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('login')
  redirectLogin() {
    //
  }

  @Get('password-reset')
  @Render('password-reset')
  passwordReset() {
    //
  }

  @Get('confirmacao')
  @Render('confirmacao')
  async confirmacaoPassword(
    @Req() req: Request,
    @Query('token') token: string,
  ) {
    return {
      tokenPassword: token,
    };
  }

  @Get('home')
  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(TipoUsuario.CLIENTE)
  @Render('home')
  homeCliente(@GetUser() user: User) {
    return {
      nome: user.nome,
      email: user.email,
    };
  }

  @Get('login')
  getIndexLogin(
    @Req() req: Request,
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    if (!req.isAuthenticated()) {
      res.render('login', {
        message: req.flash('loginError'),
        username: req.flash('username'),
        class: req.flash('class'),
      });
    } else if (
      user.tipo === TipoUsuario.ADMIN ||
      user.tipo === TipoUsuario.FUNCIONARIO
    ) {
      res.redirect('users');
    } else {
      res.redirect('home');
    }
  }

  @Post('login')
  @UseFilters(AuthExceptionFilter)
  @UseGuards(LoginGuard)
  @Redirect('users')
  doLogin() {
    //
  }

  @UseFilters(AuthExceptionFilter)
  @Post('logout')
  @Redirect('login')
  logout(@Req() req: Request) {
    req.session.destroy(null);
  }
}
