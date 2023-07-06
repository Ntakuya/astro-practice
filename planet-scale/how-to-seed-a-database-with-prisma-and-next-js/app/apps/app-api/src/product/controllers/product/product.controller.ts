import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { of } from 'rxjs';

@Controller('products')
export class ProductController {
  @Get()
  findAll$() {
    return of(this.service.findAll());
  }

  constructor(private readonly service: ProductService) {}
}
