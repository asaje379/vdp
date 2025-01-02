import { Module } from '@nestjs/common';
import { TimerController } from './timer.controller';
import { TimerService } from './timer.service';
import { PrismaModule } from '@app/prisma';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, HttpModule],
  controllers: [TimerController],
  providers: [TimerService],
})
export class TimerModule {}
