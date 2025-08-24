import React, { Suspense } from 'react';

import { Loading } from '@/(common)/_components';
import { setMeta } from '@/_libs';

import { NewPasswordForm } from './_components';

export const metadata = setMeta({
  title: '새 비밀번호 설정',
  url: '/auth/new-password',
});

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<Loading text='로딩 중...' />}>
      <NewPasswordForm />
    </Suspense>
  );
}
