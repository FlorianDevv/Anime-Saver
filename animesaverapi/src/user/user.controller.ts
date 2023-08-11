// user.controller.ts

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(
    @Body()
    body: {
      username: string;
      password: string;
      profilepicture: string | null;
    },
  ): Promise<Users> {
    const { username, password, profilepicture } = body;
    return this.userService.createUser(username, password, profilepicture);
  }

  // edit user
  @Patch('edit')
  @UseGuards(AuthGuard('jwt'))
  async editUser(
    @Body()
    body: {
      username: string;
      password: string;
      profilepicture: string | null;
    },
    @Request() req,
  ): Promise<Users> {
    const { username, password, profilepicture } = body;
    return this.userService.editUser(username, password, profilepicture, req);
  }
}
