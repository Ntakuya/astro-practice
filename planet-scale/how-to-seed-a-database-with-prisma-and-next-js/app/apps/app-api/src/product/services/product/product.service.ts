import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class ProductService {
  async findAll() {
    return await this.prismaService.product.findMany();
  }

  constructor(private readonly prismaService: PrismaService) {}
}
