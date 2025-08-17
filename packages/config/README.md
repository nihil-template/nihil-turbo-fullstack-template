# @repo/config

터보리포의 중앙화된 설정 관리 패키지입니다.

## 구조

```
packages/config/
├── package.json
├── web.config.ts           # 웹 앱용 설정
├── web.config-example.ts   # 웹 앱용 설정 예제
├── server.config.ts        # 서버 앱용 설정
├── server.config-example.ts # 서버 앱용 설정 예제
├── eslint.config.mjs       # ESLint 설정
├── tsconfig.json          # TypeScript 설정
└── README.md
```

## 사용법

### 웹 앱에서 사용

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
```

### 서버 앱에서 사용

```typescript
// 서버 설정 가져오기
import { serverConfig } from '@repo/config/server.config';

// 서버 정보 사용
const { port, host } = serverConfig;

// 서버 시작
const server = app.listen(port, host, () => {
  console.log(`서버가 ${host}:${port}에서 실행 중입니다.`);
});
```

## 환경별 설정

### 웹 앱 설정

**개발 환경**:

- URL: `http://localhost:3000`
- API Route: `http://localhost:8000`

**프로덕션 환경**:

- URL: `https://your-domain.com`
- API Route: 프로덕션 API 서버 주소

**주요 설정 항목**:

- 사이트 제목: "Your Blog Title"
- 설명: "Your blog description"
- 키워드: "개발, 프로그래밍, 웹 개발, React, Next.js, TypeScript"
- 작성자: Your Name
- 로고: `/images/logo.png`
- 다크모드 로고: `/images/logo-w.png`

### 서버 앱 설정

**기본 설정**:

- 포트: 8000
- 호스트: localhost

## 설정 파일 관리

### 실제 설정 파일

- `web.config.ts`: 실제 웹 설정 (Git에 커밋됨)
- `server.config.ts`: 실제 서버 설정 (Git에 커밋됨)

### 예제 설정 파일

- `web.config-example.ts`: 웹 설정 예제 및 가이드
- `server.config-example.ts`: 서버 설정 예제 및 가이드

## 설정 변경 방법

1. **예제 파일 참조**: `*-example.ts` 파일을 참조하여 설정 방법을 확인
2. **실제 파일 수정**: `*.config.ts` 파일을 직접 수정
3. **환경 변수 활용**: `process.env.NODE_ENV`를 사용하여 환경별 분기 처리

### 웹 설정 커스터마이징 예시

```typescript
// web.config.ts
export const webConfig = {
  title: 'Your Blog Title',
  description: 'Your blog description',
  keywords: '개발, 프로그래밍, 웹, React, Next.js',
  author: {
    name: 'Your Name',
    url: 'https://github.com/your-username',
  },
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://your-domain.com',
  // ... 기타 설정
};
```

### 서버 설정 커스터마이징 예시

```typescript
// server.config.ts
export const serverConfig = {
  port: 8000,
  host: 'localhost',
  // 필요시 추가 설정
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  },
};
```

## 패키지 정보

- **패키지명**: `@repo/config`
- **버전**: 0.0.0
- **라이선스**: MIT
- **타입**: Private

### Export 설정

```json
{
  "exports": {
    "./web.config": "./web.config.ts",
    "./server.config": "./server.config.ts"
  }
}
```

## 개발 가이드

### 새로운 설정 추가

1. 예제 파일에 주석과 함께 설정 항목 추가
2. 실제 설정 파일에 기본값 설정
3. README.md 문서 업데이트

### 환경별 분기 처리

```typescript
// NODE_ENV를 활용한 환경별 설정
const config = {
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://production.com',
  apiUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000'
      : process.env.API_URL,
};
```

## 요약

이 패키지는 터보리포의 웹 앱과 서버 앱에서 공통으로 사용하는 설정을 중앙화하여 관리합니다. 예제 파일을 통해 설정 방법을 안내하고, 실제 설정 파일을 통해 환경별 설정을 제공합니다. 모든 설정은 TypeScript로 작성되어 타입 안정성을 보장합니다.
