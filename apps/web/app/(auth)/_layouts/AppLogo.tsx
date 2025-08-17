'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Skeleton } from '@/(common)/_components/ui/skeleton';
import { webConfig } from '@/config';

export function AppLogo() {
  if (!webConfig.logo) {
    return (
      <div className='flex items-center gap-3'>
        <Skeleton className='h-12 w-12 rounded-8' />
        <div className='space-y-1'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-4 w-24' />
        </div>
      </div>
    );
  }

  return (
    <Link href='/' className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
      <Image
        src={webConfig.logo}
        alt='logo'
        width={48}
        height={48}
        className='h-12 w-12 rounded-8'
      />
      <div className='space-y-1'>
        <h1 className='text-h5 font-bold text-foreground leading-tight'>
          {webConfig.title || '프로젝트명'}
        </h1>
        <p className='text-sm text-muted-foreground leading-tight'>
          {webConfig.description || '프로젝트 설명'}
        </p>
      </div>
    </Link>
  );
}
