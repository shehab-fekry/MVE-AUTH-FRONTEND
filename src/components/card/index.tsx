'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const Card = ({
  title,
  description,
  footer,
  className,
}: {
  title: string;
  description: string;
  footer: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'bg-primary flex h-[80%] w-[80%] flex-col rounded-3xl border p-10',
        className
      )}
    >
      <header className='flex h-[80%] flex-col gap-4 sm:w-[80%] md:w-[70%] xl:w-[60%]'>
        <h1 className='text-[40px] leading-12 font-extrabold text-black md:text-[55px] md:leading-15 lg:text-[80px] lg:leading-20'>
          {title}
        </h1>
        <p className='text-black/60 sm:text-[22px]'>{description}</p>
      </header>
      <footer className='flex h-[20%] w-full items-end justify-end'>
        {footer}
      </footer>
    </div>
  );
};

export default Card;
