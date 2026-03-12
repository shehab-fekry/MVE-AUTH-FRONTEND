import {
  Dispatch,
  KeyboardEvent,
  RefObject,
  SetStateAction,
} from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import CustomButton from '../button';
import { ShieldCheck } from 'lucide-react';

const Otp = ({
  otp,
  setOtp,
  otpRef,
  timer,
  onVerifyOtp,
  isPendingVerify,
  onResendOtp,
  isPendingResend,
}: {
  otp: string[];
  setOtp: Dispatch<SetStateAction<string[]>>;
  otpRef: RefObject<(HTMLInputElement | null)[]>;
  timer: number;
  onVerifyOtp: () => void;
  isPendingVerify: boolean;
  onResendOtp: () => void;
  isPendingResend: boolean;
}) => {
  // OTP digits handler
  const onKeyDownHandler = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedOtp = [...otp];

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (updatedOtp[index]) {
        updatedOtp[index] = '';
        setOtp(updatedOtp);
      } else if (index > 0) {
        otpRef.current[index - 1]?.focus();
      }
      return;
    }

    // Allow only digits
    if (!/^[0-9]$/.test(e.key)) return;

    e.preventDefault();

    updatedOtp[index] = e.key;
    setOtp(updatedOtp);

    if (index < otp.length - 1) {
      otpRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-7'>
      {/* OTP */}
      <div className='flex flex-row gap-5'>
        {otp.map((code, index) => (
          <Input
            ref={(ref) => {
              otpRef.current[index] = ref;
            }}
            key={index}
            className={cn(
              `h-14 w-14 rounded-md text-center text-[20px]! font-bold`,
              false && 'border-red-600'
            )}
            type='text'
            defaultValue={otp[index]}
            maxLength={1}
            onKeyDown={(e) => onKeyDownHandler(e, index)}
          />
        ))}
      </div>
      <div className='flex w-full flex-col items-center gap-3'>
        <CustomButton
          variant={'ghost'}
          className='hover:bg-ternary group w-full overflow-hidden p-0 hover:text-black'
          isPending={isPendingVerify}
          iconBefore={
            <ShieldCheck className='size-4 -translate-x-7 translate-y-7 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0' />
          }
          onClick={onVerifyOtp}
        >
          Verify OTP
        </CustomButton>
        <CustomButton
          className='w-fit'
          variant={'default'}
          isPending={isPendingResend}
          disabled={timer !== 0}
          onClick={onResendOtp}
        >
          {timer !== 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
        </CustomButton>
      </div>
    </div>
  );
};

export default Otp;
