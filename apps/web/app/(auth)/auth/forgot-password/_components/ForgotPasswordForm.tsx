'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema, type ForgotPasswordType } from '@repo/dto/formModel';
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
import { useForgotPassword } from '@/_entities/auth/hooks';
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

export function ForgotPasswordForm({ className, ...props }: Props) {
  const { setAuthCardHeader, } = useAuthActions();
  const { mutate: forgotPassword, isPending, } = useForgotPassword({
    onSuccess: () => {
      toast.success(
        messageData.auth.forgotPasswordSuccess,
        {
          style: getToastStyle('success'),
        });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || messageData.auth.forgotPasswordError,
        {
          style: getToastStyle('error'),
        });
    },
  });

  const form = useForm<ForgotPasswordType>({
    mode: 'all',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      emlAddr: '',
    },
  });

  useEffect(() => {
    form.trigger();

    setAuthCardHeader({
      title: '비밀번호 재설정 요청',
      description: '가입시 입력한 이메일 주소를 입력해주세요. 비밀번호 재설정 링크를 전송해드립니다.',
    });
  }, [ form, setAuthCardHeader, ]);

  const onSubmit = (data: ForgotPasswordType) => {
    forgotPassword(data);
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
            placeholder='가입한 이메일을 입력해주세요.'
            autoComplete='email'
            required
            disabled={isPending}
          />

          <SubmitButton>
            {isPending
              ? '임시 비밀번호 발송 중...'
              : '임시 비밀번호 발송'}
          </SubmitButton>
        </form>
      </Form>

      {/* 유틸리티 링크들 */}
      <div className='flex flex-col gap-3 pt-4 border-t border-gray-200'>
        {/* 로그인 링크 */}
        <div className='text-center'>
          <Link
            href='/auth/signin'
            className='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
          >
            로그인으로 돌아가기
          </Link>
        </div>

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
