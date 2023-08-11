import { Controller, Post, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  //refresh token using the jwt tokken
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.login(req.user);
  }

  // check if user jwt is valid
  @UseGuards(AuthGuard('jwt'))
  @Get('check')
  check() {
    return { message: 'valid' };
  }
}
