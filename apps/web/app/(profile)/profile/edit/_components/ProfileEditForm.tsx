'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateProfileFormSchema, UpdateProfileFormType } from '@repo/dto/formModel';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/(common)/_components/ui/form';
import { Input } from '@/(common)/_components/ui/input';
import { useGetSession } from '@/_entities/auth/hooks';
import { useUpdateProfile } from '@/_entities/users/hooks';
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

export function ProfileEditForm({ className, ...props }: Props) {
  const { session, isPending: isSessionPending, } = useGetSession();

  const { mutate: updateProfile, isPending, } = useUpdateProfile({
    onSuccess: () => {
      toast.success('프로필이 성공적으로 수정되었습니다.', {
        style: getToastStyle('success'),
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || '프로필 수정에 실패했습니다.',
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  const form = useForm<UpdateProfileFormType>({
    mode: 'all',
    resolver: zodResolver(UpdateProfileFormSchema),
    defaultValues: {
      userNm: '',
      emlAddr: '',
    },
  });

  // 세션 데이터가 로드되면 폼 기본값 설정
  useEffect(() => {
    if (session) {
      form.reset({
        userNm: session.userNm || '',
        emlAddr: session.emlAddr || '',
      });
    }
  }, [ session, form, ]);

  useEffect(() => {
    form.trigger();
  }, [ form, ]);

  const onSubmit = (data: UpdateProfileFormType) => {
    if (session) {
      // API는 userNm만 받으므로 emlAddr은 제외
      updateProfile({
        userNm: data.userNm,
      });
    }
  };

  if (isSessionPending) {
    return (
      <div className={cn(cssVariants({}), className)} {...props}>
        <div className='animate-pulse space-y-4'>
          <div className='h-4 bg-muted rounded w-1/4' />
          <div className='h-4 bg-muted rounded w-1/2' />
          <div className='h-4 bg-muted rounded w-3/4' />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={cn(cssVariants({}), className)} {...props}>
        <p className='text-center text-muted-foreground'>
          세션 정보를 불러올 수 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(cssVariants({}), className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>프로필 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='userNm'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='이름을 입력하세요'
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
                name='emlAddr'
                render={({ field, }) => (
                  <FormItem>
                    <FormLabel>이메일 (읽기 전용)</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='이메일을 입력하세요'
                        disabled={true} // 이메일은 수정 불가
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
                    ? '수정 중...'
                    : '프로필 수정'}
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
