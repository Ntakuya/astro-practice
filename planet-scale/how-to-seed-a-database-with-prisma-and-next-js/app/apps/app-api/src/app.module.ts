import { Module } from '@nestjs/common';

import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [SharedModule, ProductModule],
})
export class AppModule {}
