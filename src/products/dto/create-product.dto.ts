import { SubCategory } from '@prisma/client';

export class CreateProductDto {
  subCategory: SubCategory['id'];
  uploadTo: string;
  price: number;
}
