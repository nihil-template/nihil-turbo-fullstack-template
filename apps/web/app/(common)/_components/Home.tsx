'use client';

import React from 'react';

import { Button } from '@/(common)/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/(common)/_components/ui/card';
import { Input } from '@/(common)/_components/ui/input';

export function Home() {
  return (
    <div className='container mx-auto p-8 space-y-6'>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>버튼 테스트</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Button>기본 버튼</Button>
            <Button variant='secondary'>Secondary 버튼</Button>
            <Button variant='destructive'>Destructive 버튼</Button>
            <Button variant='outline'>Outline 버튼</Button>
            <Button variant='ghost'>Ghost 버튼</Button>
            <Button variant='link'>Link 버튼</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>입력 필드 테스트</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Input placeholder='기본 입력 필드' />
            <Input placeholder='비활성화된 입력 필드' disabled />
            <Input placeholder='에러 상태 입력 필드' className='border-destructive' />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
