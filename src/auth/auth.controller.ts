import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard, KaKaoAuthGuard } from 'auth/auth.guard';
import { AuthService } from 'auth/auth.service';
import { KakaoLoginDto } from 'auth/dto/kakao-login.dto';
import { GoogleLoginDto } from 'auth/dto/google-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() request) {
    // logging google login
  }

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() request) {
    return this.authService.googleLogin(request.user as GoogleLoginDto);
  }

  @Get('/kakao/login')
  @UseGuards(KaKaoAuthGuard)
  async kakaoAuth(@Request() request) {
    // logging kakao login
  }

  @Get('/kakao/redirect')
  @UseGuards(KaKaoAuthGuard)
  kakaoAuthRedirect(@Request() request) {
    return this.authService.kakaoLogin(request.user as KakaoLoginDto);
  }
}
