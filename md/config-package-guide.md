# @repo/config 패키지 가이드

## 목차

1. [패키지 개요](#패키지-개요)
2. [패키지 구조](#패키지-구조)
3. [설정 파일 구성](#설정-파일-구성)
4. [사용법](#사용법)
5. [환경별 설정](#환경별-설정)
6. [설정 파일 관리](#설정-파일-관리)
7. [모노레포 연동](#모노레포-연동)
8. [모범 사례](#모범-사례)

## 패키지 개요

`@repo/config`는 터보리포(Turborepo) 기반 모노레포에서 사용하는 중앙화된 설정 관리 패키지입니다. 웹 애플리케이션과 서버 애플리케이션에서 공통으로 사용하는 설정들을 통합 관리하여 일관성과 유지보수성을 높입니다.

### 주요 특징

- **중앙화된 설정 관리**: 모든 설정을 한 곳에서 관리
- **타입 안전성**: TypeScript 기반 설정으로 타입 안전성 보장
- **환경별 분기**: 개발/프로덕션 환경에 따른 자동 설정 분기
- **재사용성**: 웹과 서버 앱에서 공통으로 사용 가능
- **확장성**: 새로운 설정 추가가 용이한 구조

## 패키지 구조

```
packages/config/
├── package.json              # 패키지 메타데이터
├── tsconfig.json            # TypeScript 설정
├── eslint.config.mjs        # ESLint 설정
├── README.md                # 패키지 문서
├── dist/                    # 빌드된 파일들
├── node_modules/            # 의존성
│
├── common.config.ts         # 공통 설정 (실제 사용)
├── common.config-example.ts # 공통 설정 예제
├── web.config.ts           # 웹 설정 (실제 사용)
├── web.config-example.ts   # 웹 설정 예제
├── server.config.ts        # 서버 설정 (실제 사용)
└── server.config-example.ts # 서버 설정 예제
```

### 패키지 메타데이터

```json
{
  "name": "@repo/config",
  "version": "0.0.0",
  "private": true,
  "license": "MIT",
  "exports": {
    "./web.config": "./dist/web.config.js",
    "./server.config": "./dist/server.config.js",
    "./common.config": "./dist/common.config.js"
  }
}
```

## 설정 파일 구성

### 1. 공통 설정 (common.config.ts)

모든 애플리케이션에서 공통으로 사용하는 기본 설정입니다.

```typescript
export const commonConfig = {
  appName: 'Next.js + NestJS 템플릿',
  appDescription: 'Next.js와 NestJS를 사용한 풀스택 웹 애플리케이션 템플릿',
  appVersion: '1.0.0',
};
```

**설정 항목**:

- `appName`: 애플리케이션 이름
- `appDescription`: 애플리케이션 설명
- `appVersion`: 애플리케이션 버전

### 2. 웹 설정 (web.config.ts)

웹 애플리케이션(Next.js)에서 사용하는 설정입니다.

```typescript
import { commonConfig } from './common.config';

export const webConfig = {
  title: commonConfig.appName,
  description: commonConfig.appDescription,
  keywords: 'Next.js, NestJS, TypeScript, React, Node.js, 풀스택, 템플릿',
  author: {
    name: '개발자',
    url: 'https://github.com',
  },
  type: 'website',
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://your-domain.com',
  cover: {
    link: '/opengraph-image.png',
    alt: '웹사이트 이미지',
  },
  logo: '',
  darkLogo: '',
  version: commonConfig.appVersion,
  googleVerfi: '',
  googleAdSrc: '',
  googleAnalyticsId: '',
  apiRoute: 'http://localhost:8000',
};
```

**주요 설정 항목**:

- **SEO 관련**: `title`, `description`, `keywords`, `author`
- **사이트 정보**: `type`, `url`, `version`
- **이미지**: `cover`, `logo`, `darkLogo`
- **Google 서비스**: `googleVerfi`, `googleAdSrc`, `googleAnalyticsId`
- **API 연동**: `apiRoute`

### 3. 서버 설정 (server.config.ts)

서버 애플리케이션(NestJS)에서 사용하는 설정입니다.

```typescript
import { commonConfig } from './common.config';

export const serverConfig = {
  port: 8000,
  host: 'localhost',
  swagger: {
    docsName: `${commonConfig.appName} API 문서`,
    docsDescription: `${commonConfig.appName} API 문서`,
    docsVersion: commonConfig.appVersion,
    path: 'swagger/docs',
  },
  jwt: {
    access: {
      secret: 'your-access-token-secret-here',
      expiresIn: '1h',
    },
    refresh: {
      secret: 'your-refresh-token-secret-here',
      expiresIn: '30d',
    },
  },
  nodemailer: {
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@naver.com',
      pass: 'your-app-password',
    },
  },
};
```

**주요 설정 항목**:

- **서버 정보**: `port`, `host`
- **Swagger**: `swagger` 객체 (API 문서화 설정)
- **JWT**: `jwt` 객체 (인증 토큰 설정)
- **이메일**: `nodemailer` 객체 (이메일 발송 설정)

## 사용법

### 1. 웹 애플리케이션에서 사용

```typescript
// 웹 설정 가져오기
import { webConfig } from '@repo/config/web.config';

// 사이트 정보 사용
const { title, description, url, author } = webConfig;

// 메타데이터 생성
const metadata = {
  title: webConfig.title,
  description: webConfig.description,
  keywords: webConfig.keywords,
  authors: [{ name: webConfig.author.name, url: webConfig.author.url }],
  openGraph: {
    title: webConfig.title,
    description: webConfig.description,
    url: webConfig.url,
    siteName: webConfig.title,
    images: [webConfig.cover.link],
  },
};

// API 호출 시 사용
const apiUrl = webConfig.apiRoute;
```

### 2. 서버 애플리케이션에서 사용

```typescript
// 서버 설정 가져오기
import { serverConfig } from '@repo/config/server.config';

// 서버 정보 사용
const { port, host } = serverConfig;

// 서버 시작
const server = app.listen(port, host, () => {
  console.log(`서버가 ${host}:${port}에서 실행 중입니다.`);
});

// Swagger 설정
const document = SwaggerModule.createDocument(app, {
  ...swaggerConfig,
  info: {
    title: serverConfig.swagger.docsName,
    description: serverConfig.swagger.docsDescription,
    version: serverConfig.swagger.docsVersion,
  },
});

// JWT 설정
const jwtOptions = {
  secret: serverConfig.jwt.access.secret,
  signOptions: { expiresIn: serverConfig.jwt.access.expiresIn },
};

// 이메일 설정
const mailerConfig = {
  transport: {
    host: serverConfig.nodemailer.host,
    port: serverConfig.nodemailer.port,
    secure: serverConfig.nodemailer.secure,
    auth: serverConfig.nodemailer.auth,
  },
};
```

### 3. 공통 설정 사용

```typescript
// 공통 설정 가져오기
import { commonConfig } from '@repo/config/common.config';

// 애플리케이션 정보 사용
console.log(`애플리케이션: ${commonConfig.appName}`);
console.log(`버전: ${commonConfig.appVersion}`);
console.log(`설명: ${commonConfig.appDescription}`);
```

## 환경별 설정

### 1. 개발 환경

**웹 설정**:

- URL: `http://localhost:3000`
- API Route: `http://localhost:8000`
- 로깅: 상세 로그 활성화

**서버 설정**:

- 포트: 8000
- 호스트: localhost
- Swagger: 활성화
- CORS: 모든 도메인 허용

### 2. 프로덕션 환경

**웹 설정**:

- URL: 실제 도메인 (예: `https://nihilncunia.dev`)
- API Route: 프로덕션 API 서버 주소
- 로깅: 에러 로그만 활성화

**서버 설정**:

- 포트: 환경 변수에서 가져오기
- 호스트: 0.0.0.0
- Swagger: 비활성화 또는 제한적 접근
- CORS: 특정 도메인만 허용

### 3. 환경별 자동 분기

```typescript
// web.config.ts에서 환경별 URL 분기
"url": process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://your-domain.com',

// 환경별 API 경로 분기
"apiRoute": process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000'
  : 'https://api.your-domain.com',
```

## 설정 파일 관리

### 1. 실제 설정 파일

- `web.config.ts`: 실제 웹 설정 (Git에 커밋됨)
- `server.config.ts`: 실제 서버 설정 (Git에 커밋됨)
- `common.config.ts`: 실제 공통 설정 (Git에 커밋됨)

### 2. 예제 설정 파일

- `web.config-example.ts`: 웹 설정 예제 및 가이드
- `server.config-example.ts`: 서버 설정 예제 및 가이드
- `common.config-example.ts`: 공통 설정 예제 및 가이드

### 3. 설정 파일 수정 가이드

새로운 프로젝트에서 설정을 수정할 때:

1. **예제 파일 참조**: 각 `*-example.ts` 파일을 참조하여 설정 방법 파악
2. **실제 파일 수정**: `*.ts` 파일에서 실제 값으로 수정
3. **환경별 테스트**: 개발/프로덕션 환경에서 설정이 올바르게 작동하는지 확인

## 모노레포 연동

### 1. 패키지 의존성 설정

**웹 애플리케이션 (apps/web/package.json)**:

```json
{
  "dependencies": {
    "@repo/config": "workspace:*"
  }
}
```

**서버 애플리케이션 (apps/api/package.json)**:

```json
{
  "dependencies": {
    "@repo/config": "workspace:*"
  }
}
```

### 2. TypeScript 경로 설정

**tsconfig.json**:

```json
{
  "compilerOptions": {
    "paths": {
      "@repo/config": ["../../packages/config"],
      "@repo/config/*": ["../../packages/config/*"]
    }
  }
}
```

### 3. 빌드 설정

**터보리포 설정 (turbo.json)**:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

## 모범 사례

### 1. 설정 구조화

```typescript
// 설정을 논리적으로 그룹화
export const webConfig = {
  // 기본 정보
  basic: {
    title: commonConfig.appName,
    description: commonConfig.appDescription,
    version: commonConfig.appVersion,
  },

  // SEO 정보
  seo: {
    keywords: 'Next.js, NestJS, TypeScript',
    author: { name: '개발자', url: 'https://github.com' },
  },

  // 외부 서비스
  services: {
    google: {
      analytics: 'G-XXXXXXXXXX',
      adsense: 'ca-pub-XXXXXXXXXX',
    },
    api: {
      route: 'http://localhost:8000',
    },
  },
};
```

### 2. 타입 안전성 확보

```typescript
// 설정 타입 정의
interface WebConfig {
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    url: string;
  };
}

// 타입 검증
export const webConfig: WebConfig = {
  title: commonConfig.appName,
  description: commonConfig.appDescription,
  // ... 기타 설정
};
```

### 3. 환경 변수 활용

```typescript
// 민감한 정보는 환경 변수에서 가져오기
export const serverConfig = {
  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET || 'fallback-secret',
      expiresIn: '1h',
    },
  },
  nodemailer: {
    auth: {
      user: process.env.NODEMAILER_USER || '',
      pass: process.env.NODEMAILER_PASS || '',
    },
  },
};
```

### 4. 설정 검증

```typescript
// 설정 유효성 검증 함수
function validateWebConfig(config: any): void {
  if (!config.title) {
    throw new Error('웹 설정에 title이 필요합니다.');
  }
  if (!config.url) {
    throw new Error('웹 설정에 url이 필요합니다.');
  }
}

// 설정 로드 시 검증
validateWebConfig(webConfig);
```

## 요약

`@repo/config` 패키지는 모노레포 환경에서 설정을 중앙화하여 관리하는 강력한 도구입니다. 주요 장점은 다음과 같습니다:

- **일관성**: 웹과 서버 앱에서 동일한 설정 구조 사용
- **유지보수성**: 설정 변경 시 한 곳에서만 수정
- **타입 안전성**: TypeScript를 통한 설정 타입 검증
- **환경별 분기**: 개발/프로덕션 환경에 따른 자동 설정 분기
- **확장성**: 새로운 설정 추가가 용이한 구조

이 패키지를 활용하면 프로젝트 전체의 설정 관리가 훨씬 효율적이고 안정적으로 이루어집니다.
