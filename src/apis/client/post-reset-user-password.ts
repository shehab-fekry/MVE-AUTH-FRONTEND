import { clientApi } from '@/src/core/api/client';
import { useMutation } from '@tanstack/react-query';
import { TimeoutError } from 'ky';
import { toast } from 'sonner';

type IRequestProps = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

type IResponseProps = {
  message: string;
};

const postResetUserPassword = async (payload: IRequestProps) => {
  try {
    const res = await clientApi.post('auth/api/reset-user-password', {
      json: payload,
    });
    const data: IResponseProps = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    // network/cors errors
    if (error instanceof TypeError) {
      throw new Error('Somthing went wrong! Please try again later.');
    }

    // timeout errors
    if (error instanceof TimeoutError) {
      throw new Error('Server is taking too long to responed.');
    }

    // http errors
    throw new Error((error as IResponseProps).message);
  }
};

export const usePostResetUserPassword = () => {
  return useMutation({
    mutationFn: (payload: IRequestProps) =>
      postResetUserPassword(payload),
    mutationKey: [],
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
