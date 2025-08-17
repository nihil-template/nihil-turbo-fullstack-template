import { NextResponse, type NextRequest } from 'next/server';

// 미들웨어가 실행될 경로를 정의합니다.
// API 라우트, Next.js 내부 경로, 정적 파일, 로그인 페이지, 인덱스 페이지 등은 제외합니다.
export const config = {
  matcher: [],
};

export async function middleware(request: NextRequest) {}
