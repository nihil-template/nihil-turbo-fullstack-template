import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { SuccessInterceptor } from './success.interceptor';
import { HttpLoggingInterceptor } from './http-logging.interceptor';
import { HttpExceptionFilter } from './http-exception.filter';
import { serverConfig } from '@repo/config/server.config';
import cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerUiOptions } from './swagger.config';
import { Logger } from '@nestjs/common';

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
    new HttpLoggingInterceptor(),
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
    'api',
    app,
    document,
    swaggerUiOptions
  );

  await app.listen(
    serverConfig.port,
    serverConfig.host
  );

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 애플리케이션이 http://${serverConfig.host}:${serverConfig.port} 에서 실행 중입니다.`);
  logger.log(`📚 Swagger 문서는 http://${serverConfig.host}:${serverConfig.port}/api 에서 확인 가능합니다.`);
}

const handleError = (error: Error): void => {
  new Logger('Bootstrap').error('❌ 애플리케이션 시작에 실패했습니다:', error.stack);
  process.exit(1);
};

bootstrap().catch(handleError);
