'use client';

import { ReactNode } from 'react';
import TanStackProvider from './tanstack-qurey';
import { Toaster } from 'sonner';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TanStackProvider>{children}</TanStackProvider>
      <Toaster className='p-10' />
    </>
  );
};

export default Providers;
