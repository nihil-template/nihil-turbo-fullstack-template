'use client';

import { messages } from '@repo/message';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/(common)/_components/ui/button';
import { Skeleton } from '@/(common)/_components/ui/skeleton';
import { useGetSession, useSignOut } from '@/_entities/auth/hooks';
import { cn, getToastStyle } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {}

const cssVariants = cva([ 'flex items-center gap-2', ]);

export function AuthButtons({ className, ...props }: Props) {
  const router = useRouter();
  const { session, isPending: isSessionPending, } = useGetSession();

  const { mutate: signOut, } = useSignOut({
    onSuccess: () => {
      toast.success(messages.auth.signOutSuccess, {
        style: getToastStyle('success'),
      });
      router.push('/');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || messages.auth.signOutError,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  const handleSignOut = () => {
    signOut(null);
  };

  if (isSessionPending) {
    return <Skeleton className='h-10 w-48' />;
  }

  return (
    <div className={cn(cssVariants({}), className)} {...props}>
      {session
        ? (
          <>
            <span className='hidden text-sm font-medium sm:inline'>
              {session.userNm || session.emlAddr}
              님
            </span>
            <Button variant='ghost' asChild>
              <Link href='/profile'>마이페이지</Link>
            </Button>
            <Button variant='ghost' onClick={handleSignOut}>
              로그아웃
            </Button>
          </>
        )
        : (
          <>
            <Button variant='ghost' asChild>
              <Link href='/auth/signin'>로그인</Link>
            </Button>
            <Button asChild>
              <Link href='/auth/signup'>회원가입</Link>
            </Button>
          </>
        )}
    </div>
  );
}
