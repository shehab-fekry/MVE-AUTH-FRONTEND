'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ArrowLeft,
  EyeClosedIcon,
  EyeIcon,
  Key,
  Lock,
  Mail,
} from 'lucide-react';

import CustomButton from '@/src/components/button';
import { Label } from '@/src/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, signinSchemaType } from '@/src/core/schemas';
import { Checkbox } from '../../ui/checkbox';
import { ROUTES } from '@/src/core/constants';
import { useRouter } from 'next/navigation';
import { useMutationPostUserLogin } from '@/src/apis/client/post-login';
import CustomInput from '../../input';

const SigninForm = () => {
  const router = useRouter();
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signinSchemaType>({
    resolver: zodResolver(signinSchema),
  });
  // states
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  // apis
  const { data, isPending, mutate } = useMutationPostUserLogin();

  const onSbmuitHnadler = (fromData: signinSchemaType) => {
    mutate(fromData);
  };

  return (
    <div className='flex h-full w-[60%] flex-col items-center sm:w-[40%] lg:w-[35%] xl:w-[22%]'>
      <div className='relative mt-28 mb-10 text-[22px] text-black'>
        <h1>
          Login to <span className='font-bold'>ONRUSH</span>.
        </h1>
        <CustomButton
          onClick={() => router.push(ROUTES.registerRole)}
          className='absolute top-1.5 -left-17 size-7 rounded-full border bg-white p-0 hover:shadow-sm'
          iconBefore={<ArrowLeft />}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSbmuitHnadler)}
        className='grid w-full items-start gap-6 2xl:w-[80%]'
      >
        {/* email */}
        <CustomInput
          htmlFor='email'
          label='Emai'
          type='email'
          error={errors.email}
          beforeContent={<Mail className='m-2 size-4.75' />}
          {...register('email')}
        />
        {/* password */}
        <CustomInput
          htmlFor='password'
          label='Password'
          type={showPass ? 'text' : 'password'}
          error={errors.password}
          beforeContent={<Lock className='m-2 size-4.75' />}
          afterContent={
            <CustomButton
              onClick={(e) => {
                e?.preventDefault();
                setShowPass((prev) => !prev);
              }}
              className='rounded-none border-l p-0'
            >
              {showPass ? (
                <EyeIcon size={19} />
              ) : (
                <EyeClosedIcon size={19} />
              )}
            </CustomButton>
          }
          {...register('password')}
        />
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row items-center gap-1'>
            <Checkbox
              id='rememberMe'
              className='cursor-pointer border border-black/20'
              checked={rememberMe}
              onCheckedChange={(statues: boolean) =>
                setRememberMe(statues)
              }
            />
            <Label htmlFor='rememberMe'>Remember Me</Label>
          </div>
          <CustomButton
            onClick={() => router.push(ROUTES.forgotPassword)}
            className='cursor-pointer p-0 text-[14px]'
            type='button'
          >
            Forgot Password?
          </CustomButton>
        </div>
        <CustomButton
          type='submit'
          variant={'ghost'}
          isPending={isPending}
          className='hover:bg-ternary group overflow-hidden p-2 hover:text-black'
          iconBefore={
            <Key className='size-4 -translate-x-7 translate-y-7 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0' />
          }
        >
          Sign in
        </CustomButton>
      </form>
    </div>
  );
};

export default SigninForm;
