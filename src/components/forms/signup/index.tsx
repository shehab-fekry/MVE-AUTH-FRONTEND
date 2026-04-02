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
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
import { Label } from '../../ui/label';

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
  const [country, setCountry] = useState({
    value: {
      phone: '',
      countryCode: '',
    },
    error: '',
  });
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
        role,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        ...(role === 'seller' && {
          phoneNumber: country.value.phone,
          country: country.value.countryCode,
        }),
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
      mutateRegister(
        {
          role,
          ...(role === 'seller' && {
            phoneNumber: country.value.phone,
            country: country.value.countryCode,
          }),
          ...userData,
        },
        {
          onSuccess: () => {
            setTimer(60);
          },
        }
      );
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

    mutateVerify(
      {
        role,
        ...(role === 'seller' && {
          phoneNumber: country.value.phone,
          country: country.value.countryCode,
        }),
        ...payload,
      },
      {
        onSuccess: () => {
          router.push(ROUTES.login);
        },
        onError: () => {
          otpRef.current[0]?.focus();
        },
      }
    );
  };

  return (
    <div className='flex h-full w-[60%] flex-col items-center sm:w-[40%] lg:w-[35%] xl:w-[22%]'>
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
          className='grid w-full items-start gap-6 2xl:w-[80%]'
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
          {/* phone number */}
          {role === 'seller' && (
            <div className='grid gap-3'>
              <Label htmlFor='phone'>Phone Number</Label>
              <div
                className={cn(
                  'rounded-md border',
                  country.error && 'border-red-400'
                )}
              >
                <PhoneInput
                  inputStyle={{
                    height: '36px',
                    width: '100%',
                    background: 'none',
                    border: country.error
                      ? 'none'
                      : '1px solid #d1d5db',
                  }}
                  dropdownStyle={{
                    borderRadius: '8px',
                    // width: '335px',
                  }}
                  dropdownClass='hide-scrollbar w-[1000px]'
                  country={'eg'}
                  value={country.value.phone}
                  onChange={(phone, data) => {
                    return setCountry({
                      value: {
                        phone,
                        countryCode: (data as CountryData)
                          .countryCode,
                      },
                      error:
                        phone.length < 5
                          ? 'Phone number is required'
                          : phone.length < 7
                            ? 'Phone Must be 11 numbers'
                            : '',
                    });
                  }}
                />
              </div>
              {country.error && (
                <div className='-mt-1.5 ml-2 text-xs text-red-500'>
                  {country.error}
                </div>
              )}
            </div>
          )}
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
            onClick={() => {
              if (role === 'seller' && !country.value.phone) {
                setCountry((prev) => ({
                  ...prev,
                  error: 'Phone number is required',
                }));
                return;
              }
            }}
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
          role={role}
        />
      )}
    </div>
  );
};

export default SignupForm;
