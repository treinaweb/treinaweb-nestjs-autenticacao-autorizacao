import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
} from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { CreatePasswordResetDto } from './dto/create-password-reset.dto';
import { UpdatePasswordResetDto } from './dto/update-password-reset.dto';
import { PasswordResetDto } from './dto/password-reset.dto';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post()
  @Redirect('/login')
  create(@Body() createPasswordResetDto: CreatePasswordResetDto) {
    return this.passwordResetService.createPasswordReset(
      createPasswordResetDto,
    );
  }

  @Post('confirmacao')
  @Redirect('/login')
  async resetarSenha(@Body() passwordReset: PasswordResetDto) {
    await this.passwordResetService.resetarSenha(passwordReset);
  }

  @Get()
  findAll() {
    return this.passwordResetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordResetService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordResetDto: UpdatePasswordResetDto,
  ) {
    return this.passwordResetService.update(+id, updatePasswordResetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordResetService.remove(+id);
  }
}
