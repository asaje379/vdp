import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateTimer } from './timer.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosInstance } from 'axios';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TimerService {
  private http: AxiosInstance;

  constructor(private prisma: PrismaService, private httpService: HttpService) {
    this.http = this.httpService.axiosRef;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    console.log('New check');
    await this.checkAndRunTasks();
  }

  async registerTask(data: CreateTimer) {
    console.log(
      `Event [${data.label}] scheduled for ${new Date(
        data.at,
      ).toLocaleString()}`,
    );
    return await this.prisma.task.create({ data });
  }

  async checkAndRunTasks() {
    const pendingTasks = await this.prisma.task.findMany({
      where: { status: TaskStatus.REGISTERED, at: { lt: new Date() } },
    });

    console.log(pendingTasks);

    for (const task of pendingTasks) {
      console.log(`Notification for [${task.label}]`, task.payload);
      try {
        const response = await this.http.post(task.callbackUrl, {
          id: task.id,
          data: task.payload,
        });
        console.log(response.data, 'task', task.id);
      } catch (e) {
        console.log(e.message, 'check-and-run');
      } finally {
        await this.prisma.task.update({
          where: { id: task.id },
          data: { status: TaskStatus.PENDING },
        });
        console.log(`Tast updated: ${task.id}(${task.label})`);
      }
    }
  }

  async completeTask(id: string) {
    console.log('Completing task:', id);
    return await this.prisma.task.update({
      where: { id },
      data: { status: TaskStatus.COMPLETED },
    });
  }

  async markTaskAsFailed(id: string) {
    console.log('Failing task:', id);
    return await this.prisma.task.update({
      where: { id },
      data: { status: TaskStatus.FAILED },
    });
  }

  async cancelTask(id: string) {
    console.log('Cancelling task:', id);
    const successStatus = [
      TaskStatus.COMPLETED,
      TaskStatus.FAILED,
    ] as TaskStatus[];
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!successStatus.includes(task.status)) {
      return await this.prisma.task.update({
        where: { id },
        data: { status: TaskStatus.CANCELED },
      });
    }
  }
}
