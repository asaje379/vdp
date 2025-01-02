import { Module } from '@nestjs/common';
import { TimerConsumerService } from './timer-consumer.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TimerConsumerService],
  exports: [TimerConsumerService],
})
export class TimerConsumerModule {}
