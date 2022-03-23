import { Injectable } from '@nestjs/common';
import { MainCategory, Product, SubCategory } from '@prisma/client';
import { PrismaService } from 'prisma.service';
import {
  CreateMainCategoryDto,
  CreateSubCategoryDto,
} from 'products/dto/create-category.dto';
import { CreateProductDto } from 'products/dto/create-product.dto';
import { UpdateProductDto } from 'products/dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // 전체 카테고리 조회를 위하여 사용
  async findAllMainCategory(): Promise<MainCategory[]> {
    return this.prisma.mainCategory.findMany();
  }

  // 메인 카테고리를 기준으로 하위 카테고리(서브 카테고리) 조회를 위하여 사용
  async findMainCategory(id: number): Promise<SubCategory[]> {
    return this.prisma.subCategory.findMany({
      where: { mainCategoryId: id },
    });
  }

  // 메인 카테고리를 생성하기 위하여 사용
  async createMainCategory(
    createMainCategoryDto: CreateMainCategoryDto,
  ): Promise<MainCategory> {
    return this.prisma.mainCategory.create({
      data: createMainCategoryDto,
    });
  }

  // 메인 카테고리를 삭제하기 위하여 사용
  async deleteMainCategory(id: number): Promise<void> {
    this.prisma.mainCategory.delete({
      where: { id },
    });
  }

  // 서브 카테고리에 포함된 모든 상품들을 조회하기 위하여 사용
  async findSubCategory(id: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { subCategoryId: id },
    });
  }

  // 서브 카테고리를 생성하기 위하여 사용
  async createSubCategory(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.prisma.subCategory.create({
      data: createSubCategoryDto,
    });
  }

  // 서브 카테고리를 삭제하기 위하여 사용
  async deleteSubCategory(id: number): Promise<void> {
    this.prisma.subCategory.delete({
      where: { id },
    });
  }

  // 상품 번호를 통해 상품을 조회하기 위하여 사용
  async findProduct(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // 새로운 상품을 올리기 위하여 사용
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  // 상품의 세부 사항 변경을 위하여 사용
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.prisma.product.update({
      data: {
        subCategoryId: updateProductDto.subCategory,
        price: updateProductDto.price,
      },
      where: { id },
    });
  }

  // 상품을 삭제하기 위하여 사용
  async deleteProduct(id: number): Promise<void> {
    this.prisma.product.delete({
      where: { id },
    });
  }
}
