import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children, }: Props) {
  return (
    <main className='flex min-h-dvh w-full items-center justify-center bg-muted/40'>
      <div className='w-full max-w-[500px]'>{children}</div>
    </main>
  );
}
