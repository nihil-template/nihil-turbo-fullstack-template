import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { SuccessInterceptor } from './success.interceptor';
import { HttpExceptionFilter } from './http-exception.filter';
import { serverConfig } from '@repo/config/server.config';
import cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(cookieParser());

  // 글로벌 파이프 설정
  app.useGlobalPipes(
    new ZodValidationPipe()
  );

  // 글로벌 인터셉터 설정
  app.useGlobalInterceptors(
    new SuccessInterceptor()
  );

  // 글로벌 필터 설정
  app.useGlobalFilters(
    new HttpExceptionFilter()
  );

  // Swagger 설정
  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig
  );

  SwaggerModule.setup(
    'swagger/docs',
    app,
    document
  );

  await app.listen(
    serverConfig.port,
    serverConfig.host
  );

  console.log(`애플리케이션이 ${serverConfig.host}:${serverConfig.port}에서 실행 중입니다.`);
}

const handleError = (error: Error): void => {
  console.error('애플리케이션 시작 실패:', error.message);
  process.exit(1);
};

bootstrap().catch(handleError);
