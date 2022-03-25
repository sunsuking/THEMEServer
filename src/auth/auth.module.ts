import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from 'auth/auth.service';
import { AuthController } from 'auth/auth.controller';
import { PrismaService } from 'prisma.service';
import { GoogleStrategy } from 'auth/strategy/google.strategy';
import { KaKaoStrategy } from 'auth/strategy/kakao.strategy';
import { JwtStrategy } from 'auth/strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: 60 * 60 * 24 * 7 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    GoogleStrategy,
    KaKaoStrategy,
    JwtStrategy,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
