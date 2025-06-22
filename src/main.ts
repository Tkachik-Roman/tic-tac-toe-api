import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Создание экземпляра приложения
  const app = await NestFactory.create(AppModule);

  // Глобальная валидация DataTransferObjects
  app.useGlobalPipes(new ValidationPipe());

  // Включение версионирования API
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  // Глобальный префикс для всех маршрутов
  app.setGlobalPrefix('api');

  // Включение совместного использования ресурсов из разных источников
  // Запросы разрешаются с разрешенного домена localhost:3000 указанными методами
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Запуск приложения. Сервер слушает входящие соединения на указанном порте
  await app.listen(3000);
  
  // Логирование статуса запуска приложения
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();