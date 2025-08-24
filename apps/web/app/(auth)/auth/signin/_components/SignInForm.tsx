'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema, type SignInType } from '@repo/dto/formModel';
import { messages } from '@repo/message';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/(common)/_components/form/FormInput';
import { SubmitButton } from '@/(common)/_components/form/SubmitButton';
import { Form } from '@/(common)/_components/ui/form';
import { useAuthActions } from '@/_entities/auth/auth.store';
import { useSignIn } from '@/_entities/auth/hooks';
import { cn, getToastStyle } from '@/_libs';

interface Props
  extends React.FormHTMLAttributes<HTMLFormElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `flex flex-col gap-2 flex-1`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function SignInForm({ className, ...props }: Props) {
  const { setAuthCardHeader, } = useAuthActions();

  const router = useRouter();

  const { mutate: signIn, isPending, } = useSignIn({
    onSuccess: () => {
      toast.success(
        messages.auth.signInSuccess,
        {
          style: getToastStyle('success'),
        });

      router.push('/');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || messages.auth.signInError,
        {
          style: getToastStyle('error'),
        });
    },
  });

  const form = useForm<SignInType>({
    mode: 'all',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      emlAddr: '',
      password: '',
    },
  });

  useEffect(() => {
    form.trigger();

    setAuthCardHeader({
      title: '로그인',
      description: '로그인 후 서비스를 이용해주세요.',
    });
  }, [ form, setAuthCardHeader, ]);

  const onSubmit = (data: SignInType) => {
    signIn(data);
  };

  return (
    <>
      <Form {...form}>
        <form
          className={cn(
            cssVariants({}),
            className
          )}
          onSubmit={form.handleSubmit(onSubmit)}
          {...props}
        >
          <FormInput
            form={form}
            label='이메일'
            name='emlAddr'
            type='email'
            placeholder='이메일을 입력해주세요.'
            autoComplete='username'
            required
            disabled={isPending}
          />

          <FormInput
            form={form}
            label='비밀번호'
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            autoComplete='current-password'
            required
            disabled={isPending}
          />

          <SubmitButton>
            {isPending
              ? '로그인 중...'
              : '로그인'}
          </SubmitButton>
        </form>
      </Form>

      {/* 유틸리티 링크들 */}
      <div className='flex flex-col gap-3 pt-4 border-t border-gray-200'>
        {/* 회원가입 링크 */}
        <div className='text-center'>
          <span className='text-sm text-gray-600'>계정이 없으신가요? </span>
          <Link
            href='/auth/signup'
            className='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
          >
            회원가입
          </Link>
        </div>

        {/* 비밀번호 찾기 링크 */}
        <div className='text-center'>
          <Link
            href='/auth/forgot-password'
            className='text-sm text-gray-500 hover:text-gray-700 transition-colors'
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        {/* 홈으로 돌아가기 링크 */}
        <div className='text-center'>
          <Link
            href='/'
            className='text-sm text-gray-400 hover:text-gray-600 transition-colors'
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
}
