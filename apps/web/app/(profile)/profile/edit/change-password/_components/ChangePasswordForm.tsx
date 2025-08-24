'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordFormSchema, ChangePasswordFormType } from '@repo/dto/formModel';
import { messages } from '@repo/message';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/(common)/_components/ui/form';
import { Input } from '@/(common)/_components/ui/input';
import { useChangePassword } from '@/_entities/auth/hooks';
import { cn, getToastStyle } from '@/_libs';

// ⚠️ 스키마는 반드시 @repo/dto에서 import

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {}

const cssVariants = cva([
  'space-y-6',
], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export function ChangePasswordForm({ className, ...props }: Props) {
  const { mutate: changePassword, isPending, } = useChangePassword({
    onSuccess: () => {
      toast.success(messages.auth.passwordChangeSuccess, {
        style: getToastStyle('success'),
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || messages.auth.passwordChangeError,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  const form = useForm<ChangePasswordFormType>({
    mode: 'all',
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormType) => {
    // API는 currentPassword와 newPassword만 받으므로 confirmPassword는 제외
    changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className={cn(cssVariants({}), className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>비밀번호 변경</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='currentPassword'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>현재 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='현재 비밀번호를 입력하세요'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='newPassword'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='새 비밀번호를 입력하세요 (10자 이상)'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='새 비밀번호를 다시 입력하세요'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-4'>
                <Button type='submit' disabled={isPending}>
                  {isPending
                    ? '변경 중...'
                    : '비밀번호 변경'}
                </Button>
                <Button variant='outline' asChild>
                  <Link href='/profile'>취소</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
