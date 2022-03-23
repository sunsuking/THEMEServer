import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MainCategory, Product, SubCategory } from '@prisma/client';
import { ProductsService } from 'products/products.service';
import {
  CreateMainCategoryDto,
  CreateSubCategoryDto,
} from 'products/dto/create-category.dto';
import { CreateProductDto } from 'products/dto/create-product.dto';
import { UpdateProductDto } from 'products/dto/update-product.dto';

@ApiTags('Products API')
@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: '메인 카테고리 전체 조회',
    description: '존재하는 모든 메인 카테고리를 조회한다.',
  })
  @Get('/mainCategories')
  async findAllMainCategory(): Promise<MainCategory[]> {
    return await this.productsService.findAllMainCategory();
  }

  @ApiOperation({
    summary: '메인 카테고리 상세 조회',
    description:
      '메인 카테고리의 id 값을 입력받아 이와 일치하는 하위 서브 카테고리들을 조회한다.',
  })
  @Get('/mainCategory/:id')
  async findMainCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SubCategory[]> {
    return await this.productsService.findMainCategory(id);
  }

  // FIXME: Request 유저가 관리자인 경우에만 사용 가능
  @ApiOperation({
    summary: '메인 카테고리 생성',
    description: '메인 카테고리를 생성한다. (관리자만 사용가능)',
  })
  @Post('/mainCategory')
  async createMainCategory(
    @Body() createMainCategoryDto: CreateMainCategoryDto,
  ): Promise<MainCategory> {
    return await this.productsService.createMainCategory(createMainCategoryDto);
  }

  // FIXME: Request 유저가 관리자인 경우에만 사용 가능
  @ApiOperation({
    summary: '메인 카테고리 삭제',
    description: '메인 카테고리를 삭제한다. (관리자만 사용가능)',
  })
  @Delete('/mainCategory/:id')
  async deleteMainCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.productsService.deleteMainCategory(id);
  }

  @ApiOperation({
    summary: '서브 카테고리 상세 조회',
    description:
      '서브 카테고리의 id 값을 입력받아 이와 일치하는 하위 상품들을 조회한다.',
  })
  @Get('/subCategory/:id')
  async findSubCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product[]> {
    return await this.productsService.findSubCategory(id);
  }

  // FIXME: Request 유저가 관리자인 경우에만 사용 가능
  @ApiOperation({
    summary: '서브 카테고리 생성',
    description: '서브 카테고리를 생성한다. (관리자만 사용가능)',
  })
  @Post('/subCategory')
  async createSubCategory(
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return await this.productsService.createSubCategory(createSubCategoryDto);
  }

  // FIXME: Request 유저가 관리자인 경우에만 사용 가능
  @ApiOperation({
    summary: '서브 카테고리 삭제',
    description: '서브 카테고리를 삭제한다. (관리자만 사용가능)',
  })
  @Delete('/subCategory/:id')
  async deleteSubCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.productsService.deleteSubCategory(id);
  }

  @ApiOperation({
    summary: '상품 상세 조회',
    description: '상품의 id를 입력받아 상품의 상세 정보를 조회한다.',
  })
  @Get('/product/:id')
  async findProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productsService.findProduct(id);
  }

  // FIXME: Request 유저가 관리자인 경우에만 사용 가능
  @ApiOperation({
    summary: '상품 생성',
    description: '상품을 생성한다. (관리자만 사용가능)',
  })
  @Post('/product')
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.createProduct(createProductDto);
  }

  // FIXME: Request 유저가 관리자인 경우에만 사용 가능
  @ApiOperation({
    summary: '상품 변경',
    description: '상품 정보를 업데이트한다. (관리자만 사용가능)',
  })
  @Patch('/product/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  // FIXME: Request 유저가 관리자인 경우에만 사용 가능
  @ApiOperation({
    summary: '상품 삭제',
    description: '상품을 삭제한다. (관리자만 사용가능)',
  })
  @Delete('/product/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productsService.deleteProduct(id);
  }
}
