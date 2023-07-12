import { Controller, Get } from '@nestjs/common';
import { FindUsersService } from '../service/find-users.service';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return this.findService.findAll$();
  }

  constructor(private findService: FindUsersService) {}
}
