import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const Section = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        'flex h-full w-full items-center justify-center bg-transparent',
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
