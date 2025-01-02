import { Module } from '@nestjs/common';
import { IndividualService } from './individual.service';
import { IndividualController } from './individual.controller';
import { PrismaModule } from '@app/prisma';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [IndividualService],
  controllers: [IndividualController],
})
export class IndividualModule {}
