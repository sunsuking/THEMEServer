import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { KakaoLoginDto } from 'auth/dto/kakao-login.dto';
import { GoogleLoginDto } from 'auth/dto/google-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() request) {
    // logging google login
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() request) {
    return this.authService.googleLogin(request.user as GoogleLoginDto);
  }

  @Get('/kakao/login')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() request) {
    // logging kakao login
  }

  @Get('/kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  kakaoAuthRedirect(@Req() request) {
    return this.authService.kakaoLogin(request.user as KakaoLoginDto);
  }
}
