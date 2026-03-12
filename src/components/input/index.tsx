import { InputHTMLAttributes, ReactNode } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';

interface customInputProps extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  error?: FieldError | undefined;
  afterContent?: ReactNode;
  beforeContent?: ReactNode;
}

const CustomInput = ({
  htmlFor,
  label,
  error,
  afterContent,
  beforeContent,
  ...props
}: customInputProps) => {
  return (
    <div className='grid gap-3'>
      <Label htmlFor={htmlFor}>{label}</Label>
      <div
        className={cn(
          'flex flex-row items-center rounded-md border',
          error && 'border border-red-400'
        )}
      >
        {beforeContent}
        <Input
          {...props}
          className={cn(
            afterContent && 'rounded-r-none',
            beforeContent && 'rounded-l-none',
            !error && 'focus-visible:border-ring'
          )}
        />
        {afterContent}
      </div>
      {error && (
        <div className='-mt-1.5 ml-2 text-xs text-red-500'>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
