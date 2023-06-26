import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { from, map } from 'rxjs';

@Controller('tasks')
export class TaskController {
  @Get('')
  getAll() {
    return this.taskService.findAll();
  }

  @Get(':uuid')
  getOneByUUID(@Param() params: GetOneByUUIDParams) {
    const { uuid } = params;
    console.log(params);
    console.log(uuid);
    return from(this.taskService.findOneByUUID(uuid)).pipe(
      map((task) => {
        if (task === undefined) {
          throw new HttpException(
            `task having ${uuid} is not found`,
            HttpStatus.NOT_FOUND,
          );
        }
        return task;
      }),
    );
  }

  constructor(private readonly taskService: TaskService) {}
}

type GetOneByUUIDParams = {
  uuid: string;
};
