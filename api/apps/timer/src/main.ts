import { NestFactory } from '@nestjs/core';
import { TimerModule } from './timer.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Env } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(TimerModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('OpenECO Timer API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(Env.app.timerPort);
}
bootstrap();
