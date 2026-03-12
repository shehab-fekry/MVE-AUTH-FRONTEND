'use client';

import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '@/src/components/ui/button';
import { cn } from '@/lib/utils';
import { Spinner } from '@/src/components/ui/spinner';

type IProps = {
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  isPending?: boolean;
} & ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const CustomButton = ({
  className,
  children,
  iconBefore,
  iconAfter,
  isPending,
  ...props
}: IProps) => {
  return (
    <Button
      {...props}
      className={cn(
        'text-md cursor-pointer rounded-3xl p-6',
        className
      )}
      disabled={props.disabled}
    >
      {isPending ? (
        <Spinner className='size-5' />
      ) : (
        <>
          {iconBefore} {children} {iconAfter}
        </>
      )}
    </Button>
  );
};

export default CustomButton;
