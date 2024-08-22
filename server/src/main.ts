import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用CORS并允许所有来源
  app.enableCors({
    origin: true,  // 允许所有来源
  });
  await app.listen(3000);
}
bootstrap();
