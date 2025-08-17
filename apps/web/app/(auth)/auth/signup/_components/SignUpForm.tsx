'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, type SignUpType } from '@repo/dto/formModel';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/(common)/_components/form/FormInput';
import { SubmitButton } from '@/(common)/_components/form/SubmitButton';
import { Form } from '@/(common)/_components/ui/form';
import { messageData } from '@/_data/message.data';
import { useAuthActions } from '@/_entities/auth/auth.store';
import { useSignUp } from '@/_entities/auth/hooks';
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

export function SignUpForm({ className, ...props }: Props) {
  const { setAuthCardHeader, } = useAuthActions();
  const { mutate: signUp, isPending, } = useSignUp({
    onSuccess: () => {
      toast.success(
        messageData.auth.signUpSuccess,
        {
          style: getToastStyle('success'),
        });
    },
    onError: (error) => {
      toast.error(
        error.response!.data.message
        || messageData.auth.signUpError,
        {
          style: getToastStyle('error'),
        });
    },
  });

  const form = useForm<SignUpType>({
    mode: 'all',
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      emlAddr: '',
      userNm: '',
      userRole: 'USER',
      password: '',
      passwordConfirm: '',
    },
  });

  useEffect(() => {
    form.trigger();

    setAuthCardHeader({
      title: '회원가입',
      description: '새로운 계정을 만들어 서비스를 이용해보세요.',
    });
  }, [ form, setAuthCardHeader, ]);

  const onSubmit = (data: SignUpType) => {
    signUp(data);
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
            label='사용자명'
            name='userNm'
            type='text'
            placeholder='사용자명을 입력해주세요.'
            required
            disabled={isPending}
          />

          <FormInput
            form={form}
            label='비밀번호'
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            autoComplete='new-password'
            required
            disabled={isPending}
          />

          <FormInput
            form={form}
            label='비밀번호 확인'
            name='passwordConfirm'
            type='password'
            placeholder='비밀번호를 다시 입력해주세요.'
            autoComplete='new-password'
            required
            disabled={isPending}
          />

          <SubmitButton>
            {isPending
              ? '회원가입 중...'
              : '회원가입'}
          </SubmitButton>
        </form>
      </Form>

      {/* 유틸리티 링크들 */}
      <div className='flex flex-col gap-3 pt-4 border-t border-gray-200'>
        {/* 로그인 링크 */}
        <div className='text-center'>
          <span className='text-sm text-gray-600'>이미 계정이 있으신가요? </span>
          <Link
            href='/auth/signin'
            className='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
          >
            로그인
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
