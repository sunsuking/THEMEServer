import { SubCategory } from '@prisma/client';
import { IsPositive, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsPositive()
  subCategory: SubCategory['id'];

  @IsUrl()
  uploadTo: string;

  @IsPositive()
  price: number;
}
