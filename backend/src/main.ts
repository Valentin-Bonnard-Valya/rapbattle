import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './error.filter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: configService.get('FRONTEND_URL'), 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: false,
  });

  app.useGlobalFilters(new HttpErrorFilter());

  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  logger.log(`Backend running on port ${port}`);
}
bootstrap();
