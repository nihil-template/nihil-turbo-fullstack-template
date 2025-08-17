import { DocumentBuilder } from '@nestjs/swagger';
import { serverConfig } from '@repo/config/server.config';

export const swaggerConfig = new DocumentBuilder()
  .setTitle(serverConfig.swagger.docsName)
  .setDescription(serverConfig.swagger.docsDescription)
  .setVersion(serverConfig.swagger.docsVersion)
  .addTag('auth', '인증 관련 API')
  .addTag('users', '사용자 관련 API')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'JWT 토큰을 입력하세요.',
      in: 'header',
    },
    'JWT-auth'
  )
  .build();
