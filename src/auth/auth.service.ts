import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma.service';
import { KakaoLoginDto } from 'auth/dto/kakao-login.dto';
import { GoogleLoginDto } from 'auth/dto/google-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(googleLoginDto: GoogleLoginDto): Promise<{ accessToken }> {
    if (!googleLoginDto) {
      throw new UnauthorizedException('Fail to Google Login');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(googleLoginDto.googleId, salt);

    // 유저를 생성하거나 조회해서 가지고 옴.
    const user: User = await this.prisma.user.upsert({
      where: {
        username: googleLoginDto.username,
      },
      update: {},
      create: {
        username: googleLoginDto.username,
        password: hashedPassword,
        platform: googleLoginDto.platform,
        platformId: googleLoginDto.googleId,
      },
    });

    // 프로필을 생성하거나 조회해서 가지고 옴.
    await this.prisma.profile.upsert({
      where: {
        userId: user.id,
      },
      update: {},
      create: {
        userId: user.id,
        nickname: googleLoginDto.nickname,
        email: googleLoginDto.email,
      },
    });

    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async kakaoLogin(kakaoLoginDto: KakaoLoginDto): Promise<{ accessToken }> {
    if (!kakaoLoginDto) {
      throw new UnauthorizedException('Fail to Google Login');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(kakaoLoginDto.kakaoId, salt);

    // 유저를 생성하거나 조회해서 가지고 옴.
    const user: User = await this.prisma.user.upsert({
      where: {
        username: kakaoLoginDto.username,
      },
      update: {},
      create: {
        username: kakaoLoginDto.username,
        password: hashedPassword,
        platform: kakaoLoginDto.platform,
        platformId: kakaoLoginDto.kakaoId,
      },
    });

    await this.prisma.profile.upsert({
      where: {
        userId: user.id,
      },
      update: {},
      create: {
        userId: user.id,
        email: kakaoLoginDto.email,
        nickname: kakaoLoginDto.nickname,
        gender: kakaoLoginDto.gender,
      },
    });

    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
