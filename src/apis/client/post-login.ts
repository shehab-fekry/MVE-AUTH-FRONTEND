import { TimeoutError } from 'ky';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { clientApi } from '@/src/core/api/client';
import { signinSchemaType } from '@/src/core/schemas';

type IResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

const postUserLogin = async (payload: signinSchemaType) => {
  try {
    const res = await clientApi.post('auth/api/user-login', {
      json: payload,
      credentials: 'include',
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error((data as { message: string }).message);
    }

    return data as IResponse;
  } catch (error) {
    // network/cors errors
    if (error instanceof TypeError) {
      throw new Error('Somthing went wrong! please try again later.');
    }
    // timeout errors
    if (error instanceof TimeoutError) {
      throw new Error('Server is taking too long to respond.');
    }
    // http errors
    throw new Error((error as { message: string }).message);
  }
};

export const useMutationPostUserLogin = () => {
  return useMutation({
    mutationKey: [],
    mutationFn: (payload: signinSchemaType) => postUserLogin(payload),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
