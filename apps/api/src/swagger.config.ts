import { DocumentBuilder, type SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('웹 애플리케이션 풀스택 API')
  .setDescription([
    '웹 애플리케이션 풀스택 템플릿을 위한 RESTful API 문서입니다.',
    '',
    '🔐 자동 인증 기능: 로그인 후 자동으로 JWT 토큰이 설정되어 별도의 인증 설정이 필요하지 않습니다.',
    '',
    '📌 사용 방법:',
    '1. /auth/signin 엔드포인트로 로그인하세요',
    '2. 로그인 성공 시 자동으로 쿠키에 토큰이 설정됩니다',
    '3. 이후 모든 API 요청에서 자동으로 인증됩니다',
    '',
    '💡 Swagger UI에서는 쿠키가 자동으로 포함되어 인증된 요청을 테스트할 수 있습니다.',
  ].join('\n'))
  .setVersion('1.0.0')
  .setContact(
    'Development Team',
    'https://github.com/your-org/nihil-turbo-fullstack-template',
    'dev@yourcompany.com'
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: '수동 JWT 토큰 입력 (선택사항 - 쿠키 인증이 우선됩니다)',
      in: 'header',
    },
    'JWT-auth'
  )
  .addCookieAuth('accessToken', {
    type: 'apiKey',
    in: 'cookie',
    name: 'accessToken',
    description: 'HTTP-Only 쿠키를 통한 자동 JWT 인증 (로그인 시 자동 설정)',
  })
  .addTag('auth', '🔐 인증 관련 API - 회원가입, 로그인, 로그아웃 등')
  .addTag('users', '👥 사용자 관리 API - 사용자 조회, 프로필 관리 등')
  .build();

// Swagger UI 커스텀 옵션
export const swaggerUiOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true, // 인증 정보 유지
    displayRequestDuration: true, // 요청 시간 표시
    filter: true, // API 필터링 기능
    tryItOutEnabled: true, // Try it out 기능 활성화
    withCredentials: true, // 쿠키 포함하여 요청
    requestInterceptor: (req: unknown) => {
      // Swagger UI가 전달하는 요청 객체에 대한 최소 타입 정의
      interface SwaggerRequest {
        url?: string;
        headers?: Record<string, string>;
      }

      const safeReq = (req as SwaggerRequest) ?? {};

      // 로그인 요청 시 특수 헤더 추가
      if (typeof safeReq.url === 'string' && safeReq.url.includes('/auth/signin')) {
        if (!safeReq.headers) {
          safeReq.headers = {};
        }
        safeReq.headers[ 'x-swagger-login' ] = 'true';
      }

      return safeReq as unknown as Record<string, unknown>;
    },
    responseInterceptor: `
      (function(res) {
        // 로그인 응답에서 토큰을 자동으로 인증에 설정
        if (res.url.includes('/auth/signin') && res.status === 200) {
          try {
            const responseData = JSON.parse(res.text);
            // SuccessInterceptor로 인해 data.accessToken 형태로 응답됨
            if (responseData.data && responseData.data.accessToken) {
              // Bearer 토큰 자동 설정
              window.ui.preauthorizeApiKey('JWT-auth', 'Bearer ' + responseData.data.accessToken);
              console.log('🔐 JWT 토큰이 자동으로 설정되었습니다. 이제 인증이 필요한 API를 테스트할 수 있습니다!');
            }
          } catch (error) {
            console.log('⚠️ 토큰 자동 설정 중 오류:', error);
          }
        }
        return res;
      })
    `,
  },
  customfavIcon: '/favicon.ico',
  customCss: `
  .swagger-ui .markdown code,
  .swagger-ui .renderedMarkdown code {
    color: #333333 !important;
    background-color: transparent !important;
    font-size: 14px !important;
    font-family: sans-serif !important;
    font-weight: 400 !important;
  }
  `,
};
