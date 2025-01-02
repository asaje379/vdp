import { Module } from '@nestjs/common';
import { EndTontineService } from './end-tontine.service';
import { EndTontineController } from './end-tontine.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  providers: [EndTontineService],
  controllers: [EndTontineController],
})
export class EndTontineModule {}
