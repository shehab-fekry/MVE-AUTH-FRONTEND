'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  EyeClosedIcon,
  EyeIcon,
  Lock,
  Mail,
  PencilLine,
  User2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '@/src/components/button';
import { signupSchema, signupSchemaType } from '@/src/core/schemas';
import { useMutationPostUserRegisteration } from '@/src/apis/client/post-user-registeration';
import { useMutationVerifyUser } from '@/src/apis/client/post-verify-user';
import { ROUTES } from '@/src/core/constants';
import Otp from '../../otp';
import FormStepper from '../../form-stepper';
import CustomInput from '../../input';

const SignupForm = ({ role }: { role: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
  });
  // apis
  const { isPending: isPendingRegister, mutate: mutateRegister } =
    useMutationPostUserRegisteration();
  const { isPending: isPendingVerify, mutate: mutateVerify } =
    useMutationVerifyUser();

  // states
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRef = useRef<(HTMLInputElement | null)[]>([]);
  const [showOtp, setShowOtp] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userData, setUserData] = useState<signupSchemaType | null>(
    null
  );

  // OTP timer logic
  useEffect(() => {
    if (!showOtp || timer === 0) return;

    const loop = setTimeout(() => {
      if (timer === 0) return;
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(loop);
  }, [showOtp, timer]);

  // on signup
  const onSubmitHandler = (formData: signupSchemaType) => {
    mutateRegister(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          setUserData(formData);
          setShowOtp(true);
          setTimer(60);
        },
      }
    );
  };

  const onResendOtp = () => {
    if (userData)
      mutateRegister(userData, {
        onSuccess: () => {
          setTimer(60);
        },
      });
  };

  const onVerifyOtp = () => {
    if (!userData) {
      setShowOtp(false);
      toast.error('All fields are required!');
      trigger(['name', 'email', 'password']);
      return;
    }

    const otpString = [...otp].join('');
    const payload = {
      ...userData,
      otp: otpString,
    };

    mutateVerify(payload, {
      onSuccess: () => {
        router.push(ROUTES.login);
      },
      onError: () => {
        otpRef.current[0]?.focus();
      },
    });
  };

  return (
    <div className='flex h-full w-[60%] flex-col items-center sm:w-[40%] lg:w-[35%] xl:w-[20%]'>
      <FormStepper
        step={showOtp ? 'otp' : 'signup'}
        goBackAction={
          showOtp
            ? () => {
                setShowOtp(false);
                setOtp(['', '', '', '']);
                setTimer(0);
              }
            : () => router.push(ROUTES.registerRole)
        }
      />
      {!showOtp ? (
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className='grid w-full items-start gap-6'
        >
          {/* name */}
          <CustomInput
            htmlFor='name'
            label='Name'
            type='name'
            error={errors.name}
            beforeContent={<User2 className='mx-2 size-4.75' />}
            {...register('name')}
          />
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
          <CustomButton
            type='submit'
            variant={'ghost'}
            className={cn(
              'group overflow-hidden p-2 hover:text-black',
              role === 'customer'
                ? 'hover:bg-ternary'
                : 'hover:bg-quaternary'
            )}
            isPending={isPendingRegister}
            disabled={isPendingRegister}
            iconBefore={
              <PencilLine className='size-4 -translate-x-7 translate-y-7 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0' />
            }
          >
            Sign up
          </CustomButton>
        </form>
      ) : (
        <Otp
          otp={otp}
          setOtp={setOtp}
          otpRef={otpRef}
          onVerifyOtp={onVerifyOtp}
          isPendingVerify={isPendingVerify}
          onResendOtp={onResendOtp}
          isPendingResend={isPendingRegister}
          timer={timer}
        />
      )}
    </div>
  );
};

export default SignupForm;
