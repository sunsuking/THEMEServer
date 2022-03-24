import { ProfileGender, User } from '@prisma/client';
import {
  IsDate,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @MinLength(4)
  @MaxLength(20)
  userId: User['id'];

  @IsString()
  nickname?: string;

  @IsPhoneNumber()
  phoneNumber?: string;

  @IsDate()
  birthDay?: Date;

  gender?: ProfileGender;
}
