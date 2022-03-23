import { MainCategory } from '@prisma/client';

export class CreateMainCategoryDto {
  name: string;
}

export class CreateSubCategoryDto {
  mainCategory: MainCategory['id'];
  name: string;
}
