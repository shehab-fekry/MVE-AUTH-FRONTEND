'use client';

import { useEffect, useRef, useState } from 'react';
import FormStepper from '../../form-stepper';
import CustomInput from '../../input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordSchema,
  forgotPasswordSchemaType,
  newPasswordSchema,
  newPasswordSchemaType,
} from '@/src/core/schemas';
import CustomButton from '../../button';
import {
  BadgeCheckIcon,
  EyeClosedIcon,
  EyeIcon,
  LockIcon,
  SendIcon,
  User2Icon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Otp from '../../otp';
import { ROUTES } from '@/src/core/constants';
import { usePostForgotUserPassword } from '@/src/apis/client/post-forgot-user-password';
import { usePostVerifyUserPassword } from '@/src/apis/client/post-verify-forgot-user-password';
import { usePostResetUserPassword } from '@/src/apis/client/post-reset-user-password';

const ForgotPasswordForm = () => {
  const router = useRouter();
  // apis
  const {
    mutate: mutateForgotPass,
    // data: dataForgotPass,
    isPending: isPendingForgotPass,
  } = usePostForgotUserPassword();
  const {
    mutate: mutateVerifyPass,
    // data: dataVerifyPass,
    isPending: isPendingVerifyPass,
  } = usePostVerifyUserPassword();
  const {
    mutate: mutateRestPass,
    // data: dataRestPass,
    isPending: isPendingRestPass,
  } = usePostResetUserPassword();
  // states
  const [step, setStep] = useState<
    'forgotPassword' | 'otp' | 'newPassword'
  >('forgotPassword');
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRef = useRef<(HTMLInputElement | null)[]>([]);
  const [userEmail, setEmail] = useState<string>('');
  const [showPass, setShowPass] = useState(false);
  const [timer, setTimer] = useState(0);
  // forms
  const forgotPassForm = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const newPassForm = useForm<newPasswordSchemaType>({
    resolver: zodResolver(newPasswordSchema),
  });

  // OTP timer logic
  useEffect(() => {
    if (step !== 'otp' || timer === 0) return;

    const loop = setTimeout(() => {
      if (timer === 0) return;
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(loop);
  }, [step, timer]);

  // step 1: on forgot password
  const onSubmitForgotPassword = (
    formData: forgotPasswordSchemaType
  ) => {
    mutateForgotPass(formData, {
      onSuccess: () => {
        setStep('otp');
        setEmail(formData.email);
        setTimer(60);
      },
      onError: () => {
        forgotPassForm.trigger('email');
      },
    });
  };

  // step 2: verify OTP
  const onVerifyOtp = () => {
    mutateVerifyPass(
      { email: userEmail, otp: otp.join('') },
      {
        onSuccess: () => {
          setStep('newPassword');
        },
      }
    );
  };

  // step 2: resend OTP
  const onResendOtp = () => {
    mutateForgotPass(
      { email: userEmail },
      {
        onSuccess: () => {
          setTimer(60);
        },
        onError: () => {
          setStep('forgotPassword');
          forgotPassForm.trigger('email');
        },
      }
    );
  };

  // step 3: on new password
  const onSubmitNewPassword = (formData: newPasswordSchemaType) => {
    mutateRestPass(
      { email: userEmail, ...formData },
      {
        onSuccess: () => {
          router.push(ROUTES.login);
        },
      }
    );
  };

  return (
    <div className='flex h-full w-[60%] flex-col items-center sm:w-[40%] lg:w-[35%] xl:w-[20%]'>
      <FormStepper
        step={step}
        goBackAction={() => router.push(ROUTES.login)}
      />
      {step === 'forgotPassword' ? (
        <form
          onSubmit={forgotPassForm.handleSubmit(
            onSubmitForgotPassword
          )}
          className='grid w-full items-start gap-6'
        >
          {/* email */}
          <CustomInput
            htmlFor='email'
            label='Email'
            type='email'
            placeholder='example@email.com'
            error={forgotPassForm.formState.errors.email}
            beforeContent={<User2Icon className='mx-2 size-4.75' />}
            {...forgotPassForm.register('email')}
          />
          <CustomButton
            type='submit'
            variant={'ghost'}
            className={cn(
              'group hover:bg-ternary overflow-hidden p-2 hover:text-black'
            )}
            isPending={isPendingForgotPass}
            disabled={isPendingForgotPass}
            iconBefore={
              <SendIcon className='size-4 -translate-x-7 translate-y-7 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0' />
            }
          >
            Sned OTP
          </CustomButton>
        </form>
      ) : step === 'otp' ? (
        <Otp
          otp={otp}
          setOtp={setOtp}
          otpRef={otpRef}
          onVerifyOtp={onVerifyOtp}
          isPendingVerify={isPendingVerifyPass}
          onResendOtp={onResendOtp}
          isPendingResend={isPendingForgotPass}
          timer={timer}
        />
      ) : (
        step === 'newPassword' && (
          <form
            onSubmit={newPassForm.handleSubmit(onSubmitNewPassword)}
            className='grid w-full items-start gap-6'
          >
            {/* new password */}
            <CustomInput
              htmlFor='newPassword'
              label='New Password'
              type={showPass ? 'text' : 'password'}
              error={newPassForm.formState.errors.newPassword}
              beforeContent={<LockIcon className='m-2 size-4.75' />}
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
              {...newPassForm.register('newPassword')}
            />
            {/* confirm password */}
            <CustomInput
              htmlFor='confirmPassword'
              label='Confirm Password'
              type={showPass ? 'text' : 'password'}
              error={newPassForm.formState.errors.confirmPassword}
              beforeContent={<LockIcon className='m-2 size-4.75' />}
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
              {...newPassForm.register('confirmPassword')}
            />
            <CustomButton
              type='submit'
              variant={'ghost'}
              className={cn(
                'group hover:bg-ternary overflow-hidden p-2 hover:text-black'
              )}
              isPending={isPendingRestPass}
              disabled={isPendingRestPass}
              iconBefore={
                <BadgeCheckIcon className='size-4 -translate-x-7 translate-y-7 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0' />
              }
            >
              Submit
            </CustomButton>
          </form>
        )
      )}
    </div>
  );
};

export default ForgotPasswordForm;
