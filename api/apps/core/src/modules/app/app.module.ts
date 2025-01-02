import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '@app/email';
import { PrismaModule } from '@app/prisma';
import { APP_GUARD } from '@nestjs/core';
import { routesToExclude } from './app.route-exclude';
import { IndividualModule } from '../individual/individual.module';
import { AnnualModule } from '../annual/annual.module';
import { RoleGuard } from '../../guards/role.guard';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { EndTontineModule } from '../end-tontine/end-tontine.module';

@Module({
  imports: [
    AuthModule,
    EmailModule,
    PrismaModule,
    IndividualModule,
    AnnualModule,
    EndTontineModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(...routesToExclude)
      .forRoutes('*');
  }
}
