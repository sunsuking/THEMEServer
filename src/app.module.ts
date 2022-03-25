import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { ProductsModule } from 'products/products.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [AuthModule, ProductsModule, AccountsModule],
})
export class AppModule {}
