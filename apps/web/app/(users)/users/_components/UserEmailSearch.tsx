'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormInput } from '@/(common)/_components/form/FormInput';
import { SubmitButton } from '@/(common)/_components/form/SubmitButton';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/(common)/_components/ui/card';
import { Form } from '@/(common)/_components/ui/form';
import { useGetUserByEmail } from '@/_entities/users/hooks';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const emailSearchSchema = z.object({
  emlAddr: z.string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식을 입력해주세요.'),
});

type EmailSearchType = z.infer<typeof emailSearchSchema>;

const cssVariants = cva(
  [
    'w-full',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function UserEmailSearch({ className, ...props }: Props) {
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<EmailSearchType>({
    resolver: zodResolver(emailSearchSchema),
    defaultValues: {
      emlAddr: '',
    },
  });

  const { user, loading, error } = useGetUserByEmail(
    searchEmail,
    {
      enabled: !!searchEmail && hasSearched,
      onSettled: () => {
        form.reset();
      },
    }
  );

  const handleSearch = (data: EmailSearchType) => {
    setSearchEmail(data.emlAddr);
    setHasSearched(true);
  };

  return (
    <Card className={cn(cssVariants({}), className)} {...props}>
      <CardHeader>
        <CardTitle>이메일로 사용자 검색</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            className="flex gap-2"
          >
            <div className="flex-1">
              <FormInput
                form={form}
                name="emlAddr"
                label="이메일 주소"
                placeholder="사용자의 이메일을 입력하세요"
                type="email"
                autoComplete="email"
              />
            </div>
            <div className="flex items-end">
              <SubmitButton
                isPending={loading}
                disabled={!form.formState.isValid}
              >
                검색
              </SubmitButton>
            </div>
          </form>
        </Form>

        {hasSearched && (
          <div className="mt-4 p-4 border rounded-lg">
            {loading && (
              <div className="text-center text-muted-foreground">
                검색 중...
              </div>
            )}

            {error && !loading && (
              <div className="text-center text-destructive">
                사용자를 찾을 수 없습니다.
              </div>
            )}

            {user && !loading && (
              <div className="space-y-2">
                <h3 className="font-semibold">검색 결과</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">이름:</span> {user.userNm}
                  </div>
                  <div>
                    <span className="font-medium">이메일:</span> {user.emlAddr}
                  </div>
                  <div>
                    <span className="font-medium">역할:</span> {user.userRole}
                  </div>
                  <div>
                    <span className="font-medium">활성화:</span> {user.actvtnYn ? '예' : '아니오'}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">자기소개:</span> {user.userBiogp || '없음'}
                  </div>
                  <div>
                    <span className="font-medium">가입일:</span>{' '}
                    {new Date(user.crtDt).toLocaleDateString('ko-KR')}
                  </div>
                  <div>
                    <span className="font-medium">마지막 로그인:</span>{' '}
                    {user.lastLgnDt
                      ? new Date(user.lastLgnDt).toLocaleDateString('ko-KR')
                      : '없음'
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}