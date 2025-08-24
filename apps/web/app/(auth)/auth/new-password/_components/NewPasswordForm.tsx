'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordSchema } from '@repo/dto/formModel';
import { messages } from '@repo/message';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormInput } from '@/(common)/_components/form/FormInput';
import { SubmitButton } from '@/(common)/_components/form/SubmitButton';
import { Form } from '@/(common)/_components/ui/form';
import { useAuthActions } from '@/_entities/auth/auth.store';
import { useNewPassword } from '@/_entities/auth/hooks';
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

// 비밀번호 확인을 포함한 스키마
const NewPasswordWithConfirmSchema = NewPasswordSchema.extend({
  passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
}).refine((data) => data.newPassword === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: [ 'passwordConfirm', ],
});

type NewPasswordWithConfirmType = z.infer<typeof NewPasswordWithConfirmSchema>;

export function NewPasswordForm({ className, ...props }: Props) {
  const searchParams = useSearchParams();
  const { setAuthCardHeader, } = useAuthActions();
  const { mutate: setNewPassword, isPending, } = useNewPassword({
    onSuccess: () => {
      toast.success(
        messages.auth.passwordChangeSuccess,
        {
          style: getToastStyle('success'),
        });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || messages.auth.passwordChangeError,
        {
          style: getToastStyle('error'),
        });
    },
  });

  const form = useForm<NewPasswordWithConfirmType>({
    mode: 'all',
    resolver: zodResolver(NewPasswordWithConfirmSchema),
    defaultValues: {
      resetToken: '',
      newPassword: '',
      passwordConfirm: '',
    },
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      form.setValue('resetToken', token);
    }

    form.trigger();

    setAuthCardHeader({
      title: '새 비밀번호 설정',
      description: '새로운 비밀번호를 입력해주세요.',
    });
  }, [ form, setAuthCardHeader, searchParams, ]);

  const onSubmit = (data: NewPasswordWithConfirmType) => {
    // passwordConfirm은 제외하고 API에 전송
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, ...apiData } = data;
    setNewPassword(apiData);
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
            label='새 비밀번호'
            name='newPassword'
            type='password'
            placeholder='새 비밀번호를 입력해주세요.'
            autoComplete='new-password'
            required
            disabled={isPending}
          />

          <FormInput
            form={form}
            label='새 비밀번호 확인'
            name='passwordConfirm'
            type='password'
            placeholder='새 비밀번호를 다시 입력해주세요.'
            autoComplete='new-password'
            required
            disabled={isPending}
          />

          <SubmitButton>
            {isPending
              ? '비밀번호 설정 중...'
              : '비밀번호 설정'}
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
