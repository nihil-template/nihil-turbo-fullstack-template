import React from 'react';

import { setMeta } from '@/_libs';

import { ForgotPasswordForm } from './_components';

export const metadata = setMeta({
  title: '비밀번호 찾기',
  url: '/auth/forgot-password',
});

export default function ForgotPasswordPage() {
  return (
    <ForgotPasswordForm />
  );
}
