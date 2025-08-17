'use client';

import { type VariantProps } from 'class-variance-authority';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { fieldContainerVariants, inputVariants, itemVariants, labelVariants } from '@/(common)/_components/form/form-input.cva';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/(common)/_components/ui/form';
import { Input } from '@/(common)/_components/ui/input';
import { cn } from '@/_libs';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form' | 'size'>,
  VariantProps<typeof itemVariants> {
  className?: string;
  form: UseFormReturn<any>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  type?: string;
  labelClassName?: string;
  inputClassName?: string;
  layout?: 'vertical' | 'horizontal';
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'error' | 'disabled';
}

export function FormInput({
  className,
  form,
  label,
  name,
  required = false,
  disabled = false,
  placeholder,
  autoComplete,
  type = 'text',
  size,
  variant,
  labelClassName,
  inputClassName,
  layout = 'vertical',
  ...props
}: Props) {
  const isDisabled = disabled || form.formState.isSubmitting;

  return (
    <FormField
      control={form.control}
      name={name!}
      render={({ field, fieldState, }) => {
        const hasError = !!fieldState.error;

        return (
          <FormItem className={cn(
            itemVariants({}),
            className
          )}
          >
            <div className={cn(
              fieldContainerVariants({ layout, })
            )}
            >
              <FormLabel className={cn(
                labelVariants({
                  layout,
                  disabled: isDisabled,
                }),
                labelClassName
              )}
              >
                {label}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  disabled={isDisabled}
                  className={cn(
                    inputVariants({
                      variant: hasError
                        ? 'error'
                        : isDisabled
                          ? 'disabled'
                          : variant || 'default',
                      size: size || 'default',
                    }),
                    inputClassName
                  )}
                  {...props}
                />
              </FormControl>
            </div>
            <FormMessage className='ml-auto' />
          </FormItem>
        );
      }}
    />
  );
}
