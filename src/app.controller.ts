import {
  Controller,
  Get,
  Post,
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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  getIndexLogin(@Req() req: Request, @Res() res: Response) {
    if (!req.isAuthenticated()) {
      res.render('login', {
        message: req.flash('loginError'),
        username: req.flash('username'),
        class: req.flash('class'),
      });
    } else {
      res.redirect('users');
    }
  }

  @Post('login')
  @UseFilters(AuthExceptionFilter)
  @UseGuards(LoginGuard)
  @Redirect('users')
  doLogin() {
    //
  }
}
