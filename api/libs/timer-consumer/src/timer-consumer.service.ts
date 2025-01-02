import { Env } from '@app/shared';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';

export class CreateTimer {
  label: string;
  at: string;
  payload: any;
  callbackUrl: string;
}

@Injectable()
export class TimerConsumerService {
  private http: AxiosInstance;

  constructor(private httpService: HttpService) {
    this.http = this.httpService.axiosRef;
  }

  async registerTask(data: CreateTimer) {
    try {
      console.log(`${Env.msUrls.timer}/register`, data);

      await this.http.post(`${Env.msUrls.timer}/register`, data);
      return;
    } catch (error) {
      console.log('Failed to register task:', error.message);
    }
  }

  async completeTask(id: string) {
    try {
      await this.http.patch(`${Env.msUrls.timer}/complete/${id}`, {});
      return;
    } catch (error) {
      console.log('Failed to complete task:', error.message);
    }
  }

  async failTask(id: string) {
    try {
      await this.http.patch(`${Env.msUrls.timer}/failed/${id}`, {});
      return;
    } catch (error) {
      console.log('Failed to failed task:', error.message);
    }
  }

  async cancelTask(id: string) {
    try {
      await this.http.patch(`${Env.msUrls.timer}/cancel/${id}`, {});
      return;
    } catch (error) {
      console.log('Failed to cancel task:', error.message);
    }
  }
}
