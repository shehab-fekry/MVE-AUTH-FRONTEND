import { ArrowLeft } from 'lucide-react';
import CustomButton from '../button';

const FormStepper = ({
  step,
  goBackAction,
}: {
  step: 'signup' | 'otp' | 'forgotPassword' | 'newPassword';
  goBackAction: () => void;
}) => {
  const headerText = {
    signup: 'Create Account.',
    otp: 'Enter OTP',
    forgotPassword: 'Forgot Password',
    newPassword: 'Reset Password',
  };

  return (
    <div className='relative mt-28 mb-10 text-[22px] text-black'>
      <h1> {headerText[step]}</h1>
      <CustomButton
        onClick={goBackAction}
        className='absolute top-1.5 -left-19 size-7 rounded-full border bg-white p-0 hover:shadow-sm'
        iconBefore={<ArrowLeft />}
      />
    </div>
  );
};

export default FormStepper;
