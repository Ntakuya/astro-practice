import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [SharedModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
