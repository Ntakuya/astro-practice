import { Module } from '@nestjs/common';
import { UserRepositoryService } from './inflastructure/user-repository.service';
import { FindUsersService } from './service/find-users.service';
import { UsersController } from './controllers/users.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [UserRepositoryService, FindUsersService],
  controllers: [UsersController],
})
export class UserModule {}
