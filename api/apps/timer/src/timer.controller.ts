import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { TimerService } from './timer.service';
import { CreateTimer } from './timer.dto';

@Controller()
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @Post('register')
  async registerTask(@Body() data: CreateTimer) {
    return await this.timerService.registerTask(data);
  }

  @Patch('complete/:id')
  async completeTask(@Param('id') id: string) {
    return await this.timerService.completeTask(id);
  }

  @Patch('failed/:id')
  async failedTask(@Param('id') id: string) {
    return await this.timerService.markTaskAsFailed(id);
  }

  @Patch('cancel/:id')
  async cancelTask(@Param('id') id: string) {
    return await this.timerService.cancelTask(id);
  }
}
