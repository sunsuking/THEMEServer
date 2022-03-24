import { MainCategory } from '@prisma/client';
import { IsPositive, IsString } from 'class-validator';

export class CreateMainCategoryDto {
  @IsString()
  name: string;
}

export class CreateSubCategoryDto {
  @IsPositive()
  mainCategory: MainCategory['id'];

  @IsString()
  name: string;
}
