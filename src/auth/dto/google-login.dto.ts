import { UserPlatform } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  username: string;

  platform?: UserPlatform;

  @IsString()
  nickname: string;

  googleId: string;

  @IsEmail()
  email?: string;

  accessToken: string;
  refreshToken: string;
}
