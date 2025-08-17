import React from 'react';

import { setMeta } from '@/_libs';

import { SignUpForm } from './_components';

export const metadata = setMeta({
  title: '회원가입',
  url: '/auth/signup',
});

export default function SignUpPage() {
  return (
    <SignUpForm />
  );
}
