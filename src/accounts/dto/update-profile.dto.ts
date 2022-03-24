import { PartialType } from '@nestjs/mapped-types';
import { ProfileGender } from '@prisma/client';
import { CreateProfileDto } from 'accounts/dto/create-profile.dto';
import { IsDate, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsString()
  nickname: string;

  @IsPhoneNumber()
  phoneNumber?: string;

  @IsDate()
  birthDay?: Date;

  gender?: ProfileGender;
}
