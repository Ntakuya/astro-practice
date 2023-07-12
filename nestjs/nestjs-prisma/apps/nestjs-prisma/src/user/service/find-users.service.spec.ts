import { Test, TestingModule } from '@nestjs/testing';
import { FindUsersService } from './find-users.service';

describe('FindUsersService', () => {
  let service: FindUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUsersService],
    }).compile();

    service = module.get<FindUsersService>(FindUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
