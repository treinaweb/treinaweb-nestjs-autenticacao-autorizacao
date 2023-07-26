import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password) {
    const user = await this.userService.findUserByEmail(username);
    if (user) {
      const match = await bcrypt.compare(password, user.senha);
      return match === true ? user : null;
    }
    return null;
  }
}
