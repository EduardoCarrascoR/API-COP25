import { NestFactory } from '@nestjs/core';
import { DispatchError } from './shared/filters/dispatch-error';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  app.useGlobalFilters(new DispatchError());
  await app.listen(3000);
  console.log
}
bootstrap();
