import { UserPlatform } from '@prisma/client';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class KakaoLoginDto {
  @IsString()
  username: string;

  platform?: UserPlatform;

  @IsString()
  nickname: string;

  kakaoId: string;

  @IsEmail()
  email?: string;

  gender?: any;

  @IsDate()
  birthDay?: Date;
}
