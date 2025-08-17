# TailwindCSS 커스텀 클래스 가이드

## ⚠️ 중요 주의사항

**이 프로젝트는 TailwindCSS v4의 새로운 문법을 사용하며, 일부 기존 TailwindCSS 클래스들이 무효화됩니다.**

```css
/* tailwind.css에서 */
--text-*: initial;
```

이 설정은 **기존의 `text-xl`, `text-2xl` 등의 일부 텍스트 크기 클래스를 무효화**합니다. AI 개발자들이 이 점을 반드시 인지해야 합니다.

## 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [파일 구조](#파일-구조)
3. [커스텀 텍스트 크기](#커스텀-텍스트-크기)
4. [커스텀 색상 시스템](#커스텀-색상-시스템)
5. [커스텀 크기 유틸리티](#커스텀-크기-유틸리티)
6. [커스텀 변형](#커스텀-변형)
7. [사용법 및 주의사항](#사용법-및-주의사항)
8. [기존 TailwindCSS와의 차이점](#기존-tailwindcss와의-차이점)

## 프로젝트 개요

이 프로젝트는 **TailwindCSS v4**의 새로운 문법을 사용하여 부분적으로 커스터마이징된 디자인 시스템을 구축합니다. 기존 TailwindCSS의 일부 기본 클래스들을 무효화하고 프로젝트 전용의 커스텀 클래스들을 정의합니다.

### 주요 특징

- **부분적 커스터마이징**: 일부 기존 TailwindCSS 클래스 무효화
- **OKLCH 색상 시스템**: 현대적인 색상 공간 사용
- **커스텀 유틸리티**: 프로젝트 전용 크기 및 변형 클래스
- **다크 모드 지원**: 자동 다크 모드 전환
- **반응형 디자인**: 모바일 퍼스트 접근법

## 파일 구조

```
apps/web/app/_styles/
├── tailwind.css              # 메인 TailwindCSS 설정
├── colors.css                # 커스텀 색상 정의
├── size/                     # 크기 관련 유틸리티
│   ├── dvh.css              # 동적 뷰포트 높이
│   ├── dvw.css              # 동적 뷰포트 너비
│   └── radius.css           # 커스텀 반지름
└── variant/                  # 커스텀 변형
    └── child.css            # 자식 요소 선택자
```

## 커스텀 텍스트 크기

### ⚠️ 무효화된 클래스들

```css
/* tailwind.css에서 */
--text-*: initial;
```

이 설정으로 인해 **다음 클래스들이 무효화됩니다**:

- `text-base` → `text-sm` 사용
- `text-xl` → `text-lg` 사용
- `text-2xl` → `text-h5` 사용
- `text-3xl` → `text-h4` 사용
- `text-4xl` → `text-h3` 사용
- `text-5xl` → `text-h2` 사용
- `text-6xl` → `text-h1` 사용
- `text-7xl`, `text-8xl`, `text-9xl` → 사용 불가

### 새로운 커스텀 텍스트 크기

```css
--text-xs: 0.8rem; /* 12.8px */
--text-sm: 1rem; /* 16px */
--text-md: 1.2rem; /* 19.2px */
--text-lg: 1.4rem; /* 22.4px */
--text-h1: 2.4rem; /* 38.4px */
--text-h2: 2.2rem; /* 35.2px */
--text-h3: 2rem; /* 32px */
--text-h4: 1.8rem; /* 28.8px */
--text-h5: 1.6rem; /* 25.6px */
--text-h6: 1.4rem; /* 22.4px */
```

### 사용법

```html
<!-- 올바른 사용법 -->
<h1 class="text-h1">제목 1</h1>
<h2 class="text-h2">제목 2</h2>
<p class="text-md">본문 텍스트</p>
<span class="text-sm">작은 텍스트</span>

<!-- ❌ 잘못된 사용법 (무효화됨) -->
<h1 class="text-2xl">제목 1</h1>
<p class="text-base">본문 텍스트</p>
```

## 커스텀 색상 시스템

### OKLCH 색상 공간

이 프로젝트는 **OKLCH 색상 공간**을 사용하여 더 정확하고 일관된 색상을 제공합니다.

```css
/* 기본 색상 팔레트 */
--color-red-50: oklch(0.971 0.013 17.38);
--color-red-100: oklch(0.936 0.032 17.717);
--color-red-500: oklch(0.637 0.237 25.331);
--color-red-900: oklch(0.396 0.141 25.723);

--color-blue-50: oklch(0.984 0.019 200.873);
--color-blue-500: oklch(0.398 0.07 227.392);
--color-blue-900: oklch(0.277 0.046 192.524);
```

### 사용법

```html
<!-- 배경색 -->
<div class="bg-red-500">빨간 배경</div>
<div class="bg-blue-100">연한 파란 배경</div>

<!-- 텍스트 색상 -->
<p class="text-red-900">진한 빨간 텍스트</p>
<span class="text-blue-500">파란 텍스트</span>

<!-- 테두리 색상 -->
<div class="border border-red-200">빨간 테두리</div>
```

## 커스텀 크기 유틸리티

### 1. 동적 뷰포트 높이 (dvh)

모바일 브라우저의 주소창을 고려한 동적 뷰포트 높이입니다.

```css
/* dvh.css */
--dvh-0: 0dvh;
--dvh-25: 25dvh;
--dvh-50: 50dvh;
--dvh-75: 75dvh;
--dvh-100: 100dvh;
```

```html
<!-- 사용법 -->
<div class="h-dvh-50">화면 높이의 50%</div>
<div class="h-dvh-100">전체 화면 높이</div>
```

### 2. 동적 뷰포트 너비 (dvw)

동적 뷰포트 너비입니다.

```css
/* dvw.css */
--dvw-0: 0dvw;
--dvw-25: 25dvw;
--dvw-50: 50dvw;
--dvw-75: 75dvw;
--dvw-100: 100dvw;
```

```html
<!-- 사용법 -->
<div class="w-dvw-50">화면 너비의 50%</div>
<div class="w-dvw-100">전체 화면 너비</div>
```

### 3. 커스텀 반지름

기존 TailwindCSS의 일부 반지름 클래스를 무효화하고 새로운 반지름 시스템을 제공합니다.

```css
/* radius.css */
--radius-*: initial; /* 기존 반지름 클래스 무효화 */
--radius-0: 0;
--radius-1: 0.25rem;
--radius-2: 0.5rem;
--radius-4: 1rem;
--radius-8: 2rem;
--radius-16: 4rem;
--radius-32: 8rem;
```

**무효화된 반지름 클래스들:**

- `rounded-sm` → `rounded-1` 사용
- `rounded-md` → `rounded-2` 사용
- `rounded-lg` → `rounded-4` 사용
- `rounded-xl` → `rounded-8` 사용
- `rounded-2xl` → `rounded-16` 사용
- `rounded-3xl` → `rounded-32` 사용

```html
<!-- 올바른 사용법 -->
<div class="rounded-4">4px 반지름</div>
<div class="rounded-8">8px 반지름</div>
<div class="rounded-16">16px 반지름</div>

<!-- ❌ 잘못된 사용법 (무효화됨) -->
<div class="rounded-lg">큰 반지름</div>
<div class="rounded-xl">더 큰 반지름</div>
```

## 커스텀 변형

### 자식 요소 선택자

`child.css`에서 정의된 커스텀 변형들을 사용할 수 있습니다.

```css
/* child.css */
@custom-variant first {
  &:first-of-type {
    @slot;
  }
}

@custom-variant last {
  &:last-of-type {
    @slot;
  }
}

@custom-variant hocus {
  &:hover,
  &:focus {
    @slot;
  }
}

@custom-variant nth-1 {
  &:nth-of-type(1) {
    @slot;
  }
}
```

```html
<!-- 사용법 -->
<div class="first:bg-red-500">첫 번째 요소만 빨간 배경</div>
<div class="last:bg-blue-500">마지막 요소만 파란 배경</div>
<div class="hocus:bg-green-500">호버/포커스 시 초록 배경</div>
<div class="nth-1:bg-yellow-500">첫 번째 요소만 노란 배경</div>
```

## 사용법 및 주의사항

### 1. 폰트 설정

```css
/* tailwind.css에서 정의된 폰트 */
--font-sans: 'Noto Sans KR', sans-serif;
--font-fa: 'Font Awesome 5 Free', sans-serif;
--font-code: 'Cascadia Code', sans-serif;
```

```html
<!-- 사용법 -->
<p class="font-sans">Noto Sans KR 폰트</p>
<i class="font-fa">Font Awesome 아이콘</i>
<code class="font-code">코드 블록</code>
```

### 2. 브레이크포인트

```css
/* 모바일 퍼스트 브레이크포인트 */
--breakpoint-mo-sm: 480px;
--breakpoint-mo-md: 768px;
--breakpoint-mo-lg: 1024px;
```

```html
<!-- 반응형 사용법 -->
<div class="w-full md:w-1/2 lg:w-1/3">반응형 너비</div>
```

### 3. 애니메이션

```css
/* 커스텀 애니메이션 */
--animate-spin-2: spin 2s linear infinite;
--animate-spin-3: spin 3s linear infinite;
```

```html
<!-- 사용법 -->
<div class="animate-spin-2">2초 회전</div>
<div class="animate-spin-3">3초 회전</div>
```

## 기존 TailwindCSS와의 차이점

### ❌ 무효화된 클래스들

| 카테고리    | 무효화된 클래스                                                                      | 대체 클래스                                                                    |
| ----------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| 텍스트 크기 | `text-base`, `text-xl`, `text-2xl`~`text-6xl`                                        | `text-sm`, `text-lg`, `text-h5`~`text-h1`                                      |
| 반지름      | `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl` | `rounded-1`, `rounded-2`, `rounded-4`, `rounded-8`, `rounded-16`, `rounded-32` |
| 높이        | `h-screen`                                                                           | `h-dvh-100`                                                                    |
| 너비        | `w-screen`                                                                           | `w-dvw-100`                                                                    |

### ✅ 새로 추가된 클래스들

| 클래스              | 설명               | 예시                     |
| ------------------- | ------------------ | ------------------------ |
| `text-h1`~`text-h6` | 제목용 텍스트 크기 | `text-h1`, `text-h2`     |
| `h-dvh-*`           | 동적 뷰포트 높이   | `h-dvh-50`, `h-dvh-100`  |
| `w-dvw-*`           | 동적 뷰포트 너비   | `w-dvw-50`, `w-dvw-100`  |
| `rounded-*`         | 커스텀 반지름      | `rounded-4`, `rounded-8` |
| `first:*`           | 첫 번째 요소 선택  | `first:bg-red-500`       |
| `last:*`            | 마지막 요소 선택   | `last:bg-blue-500`       |
| `hocus:*`           | 호버/포커스 상태   | `hocus:bg-green-500`     |
| `nth-1:*`           | n번째 요소 선택    | `nth-1:bg-yellow-500`    |

## 다크 모드 지원

이 프로젝트는 자동 다크 모드 전환을 지원합니다.

```css
/* 라이트 모드 (기본) */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.147 0.004 49.25);
  --primary: oklch(0.216 0.006 56.043);
}

/* 다크 모드 */
.dark {
  --background: oklch(0.147 0.004 49.25);
  --foreground: oklch(0.985 0.001 106.423);
  --primary: oklch(0.923 0.003 48.717);
}
```

```html
<!-- 사용법 -->
<div class="bg-background text-foreground">자동으로 다크 모드에 대응</div>
```

## 요약

이 프로젝트의 TailwindCSS 설정은 **부분적으로 커스터마이징된 디자인 시스템**입니다. AI 개발자들이 반드시 기억해야 할 핵심 사항:

1. **일부 기존 TailwindCSS 클래스들이 무효화됨** (`--text-*: initial;` 등)
2. **무효화된 클래스들의 대체 클래스 사용** (표 참조)
3. **커스텀 텍스트 크기 사용** (`text-h1`, `text-md` 등)
4. **OKLCH 색상 시스템** 사용
5. **동적 뷰포트 유틸리티** (`dvh-*`, `dvw-*`)
6. **커스텀 변형** (`first:*`, `last:*`, `hocus:*` 등)
7. **자동 다크 모드** 지원

이 가이드를 참고하여 프로젝트의 디자인 시스템을 올바르게 활용하시기 바랍니다.
