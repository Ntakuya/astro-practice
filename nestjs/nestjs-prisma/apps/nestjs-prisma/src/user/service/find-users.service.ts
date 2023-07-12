import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../inflastructure/user-repository.service';
import { of } from 'rxjs';

@Injectable()
export class FindUsersService {
  findAll$() {
    return of(this.userRepository.findAll());
  }

  constructor(private readonly userRepository: UserRepositoryService) {}
}
