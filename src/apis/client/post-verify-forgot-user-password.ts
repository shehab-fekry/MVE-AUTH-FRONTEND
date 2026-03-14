import { clientApi } from '@/src/core/api/client';
import { useMutation } from '@tanstack/react-query';
import { TimeoutError } from 'ky';
import { toast } from 'sonner';

type IRequestProps = {
  email: string;
  otp: string;
};

type IResponseProps = {
  message: string;
};

const postVerifyUserPassword = async (payload: IRequestProps) => {
  try {
    const res = await clientApi.post(
      'auth/api/verify-forgot-user-password',
      {
        json: payload,
      }
    );
    const data: IResponseProps = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    // network/cors errors
    if (error instanceof TypeError) {
      throw new Error('Somthing went wrong! Please try again later!');
    }

    // timeout errors
    if (error instanceof TimeoutError) {
      throw new Error('Sever is taking too long to respond.');
    }

    // http errors
    throw new Error((error as IResponseProps).message);
  }
};

export const usePostVerifyUserPassword = () => {
  return useMutation({
    mutationFn: (payload: IRequestProps) =>
      postVerifyUserPassword(payload),
    mutationKey: [],
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
