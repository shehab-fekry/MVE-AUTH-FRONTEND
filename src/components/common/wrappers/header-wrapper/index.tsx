'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import CustomButton from '@/src/components/button';

const HeaderWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <div className='w-full'>
      <section className='bg-secondary flex w-full flex-row justify-between gap-5 border-b p-4 px-20 font-medium text-black max-sm:border-b'>
        {/* title */}
        <CustomButton
          className='p-0 text-2xl font-bold'
          onClick={() => router.push('/')}
        >
          <div>
            ON
            {/* <span className='text-ternary font-extrabold'>/</span> */}
            RUSH
          </div>
        </CustomButton>
        <div className='hidden lg:block'>locale</div>
      </section>

      {children}
    </div>
  );
};

export default HeaderWrapper;
