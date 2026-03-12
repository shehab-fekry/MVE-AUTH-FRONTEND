'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ACCOUNTS, ROUTES } from '@/src/core/constants';
import CustomButton from '@/src/components/button';
import Link from 'next/link';

const RegisterRole = () => {
  const router = useRouter();

  return (
    <div className='flex h-[calc(100vh-69px)] w-full flex-col items-center'>
      <div className='mt-32 flex flex-col items-center gap-1'>
        <h1 className='text-[30px] font-bold'>Welcome To ONRUSH</h1>
        <p className='text-sm text-black/70'>
          Select account type you want to create.
        </p>
      </div>
      <section className='mt-10 mb-5 flex flex-col gap-4'>
        {ACCOUNTS?.map((account) => {
          return (
            <CustomButton
              key={account.role}
              className={cn(
                'bg-primary group flex w-87.5 cursor-pointer flex-row items-center justify-between overflow-hidden rounded-md py-8 text-black transition-transform duration-300 hover:scale-105',
                account.className
              )}
              iconAfter={account.img}
              onClick={() =>
                router.push(`${ROUTES.register}?role=${account.role}`)
              }
            >
              <div className='flex flex-col items-start'>
                <h2 className='text-sm font-bold'>{account.title}</h2>
                <p className='text-[12px] text-black/70'>
                  {account.description}
                </p>
              </div>
            </CustomButton>
          );
        })}
      </section>
      <p className='text-sm text-black/70'>
        Already have an account?{'  '}
        <Link
          className='font-bold hover:underline'
          href={ROUTES.login}
        >
          Login
        </Link>
        .
      </p>
    </div>
  );
};

export default RegisterRole;
