import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
