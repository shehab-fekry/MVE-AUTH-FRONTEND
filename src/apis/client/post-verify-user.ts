import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { clientApi } from '@/src/core/api/client';
import { POST_USER_VERIFICATION_KEY } from '@/src/core/api/keys';
import { TimeoutError } from 'ky';

type IRequest = {
  name: string;
  email: string;
  password: string;
  otp: string;
};

type IResponse = {
  message: string;
};

const postVerifyUser = async (payload: IRequest) => {
  try {
    const res = await clientApi.post('auth/api/user-verification', {
      json: payload,
    });
    const data = (await res.json()) as IResponse;

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data as IResponse;
  } catch (error) {
    // network error
    if (error instanceof TypeError) {
      throw new Error('Somthing went wrong! please try again later.');
    }

    // timeout error
    if (error instanceof TimeoutError) {
      throw new Error('Server is taking too long to respond.');
    }

    // other server errors
    throw new Error(
      (error as { message?: string })?.message ||
        'Something went wrong!'
    );
  }
};

export const useMutationVerifyUser = () => {
  return useMutation({
    mutationFn: (payload: IRequest) => postVerifyUser(payload),
    mutationKey: [POST_USER_VERIFICATION_KEY],
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data: IResponse) => {
      toast.success(data.message);
    },
  });
};
