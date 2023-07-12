import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class UserRepositoryService {
  findAll() {
    return this.prisma.user.findMany();
  }

  constructor(private readonly prisma: PrismaService) {}
}
