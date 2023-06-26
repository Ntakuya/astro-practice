import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ConfigModule.forRoot(), TaskModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
