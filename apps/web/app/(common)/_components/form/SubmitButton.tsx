'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Button } from '@/(common)/_components/ui/button';
import { cn } from '@/_libs';

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `w-full min-h-[40px] cursor-pointer mt-6`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function SubmitButton({ children, className, ...props }: Props) {
  return (
    <Button
      type='submit'
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
