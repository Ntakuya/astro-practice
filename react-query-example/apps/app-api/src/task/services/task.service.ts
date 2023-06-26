import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma/prisma.service';

@Injectable()
export class TaskService {
  async findAll() {
    return await this.prisma.task.findMany();
  }

  async findOneByUUID(taskUUID: string) {
    return await this.prisma.task.findFirst({
      where: {
        taskUUID,
      },
    });
  }

  constructor(private readonly prisma: PrismaService) {}
}
