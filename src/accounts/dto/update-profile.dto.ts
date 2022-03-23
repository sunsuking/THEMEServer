import { PartialType } from '@nestjs/mapped-types';
import { ProfileGender } from '@prisma/client';
import { CreateProfileDto } from 'accounts/dto/create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  nickname: string;
  phoneNumber: string;
  birthDay: Date;
  gender: ProfileGender;
}
