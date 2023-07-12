import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  controllers: [],
  providers: [],
  imports: [UserModule, SharedModule],
})
export class AppModule {}
