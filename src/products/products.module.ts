import { Module } from '@nestjs/common';
import { ProductsService } from 'products/products.service';
import { ProductsController } from 'products/products.controller';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
