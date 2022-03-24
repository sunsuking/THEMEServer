import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { KakaoLoginDto } from 'auth/dto/kakao-login.dto';

export class KaKaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.KAKAO_SECRET_KEY,
      callbackURL: process.env.KAKAO_REDIRECT_URL,
    });
  }

  validate(accessToken, refreshToken, profile, done) {
    const profileJson = profile._json;
    const kakaoAccount = profileJson.kakao_account;
    const payload: KakaoLoginDto = {
      username: `KAKAO${profileJson.id}`,
      nickname: kakaoAccount.profile.nickname,
      platform: 'KAKAO',
      kakaoId: String(profileJson.id),
      email: kakaoAccount.has_email ? kakaoAccount.email : null,
      gender: kakaoAccount.has_gender
        ? kakaoAccount.gender === 'male'
          ? 'MALE'
          : 'FEMALE'
        : null,
      birthDay: kakaoAccount.has_birthday ? kakaoAccount.birthday : null,
    };
    done(null, payload);
  }
}
