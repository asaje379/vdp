import { Module } from '@nestjs/common';
import { AnnualService } from './annual.service';
import { AnnualController } from './annual.controller';
import { PrismaModule } from '@app/prisma';
import { AuthModule } from '../auth/auth.module';
import { TimerConsumerModule } from '@app/timer-consumer';

@Module({
  imports: [PrismaModule, AuthModule, TimerConsumerModule],
  providers: [AnnualService],
  controllers: [AnnualController],
})
export class AnnualModule {}
