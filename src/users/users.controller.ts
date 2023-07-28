import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Redirect,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { AuthExceptionFilter } from 'src/common/filters/auth-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { TipoUsuario } from './enum/tipo-usuario.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('create')
  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(TipoUsuario.ADMIN, TipoUsuario.FUNCIONARIO)
  @Render('users/create')
  getCreate() {
    //
  }

  @Post()
  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(TipoUsuario.ADMIN, TipoUsuario.FUNCIONARIO)
  @Redirect('users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseFilters(AuthExceptionFilter)
  @UseGuards(RolesGuard)
  @Roles(TipoUsuario.ADMIN, TipoUsuario.FUNCIONARIO)
  @Render('users/index')
  async findAll() {
    return { users: await this.usersService.findAll() };
  }
}
