import { clientApi } from '@/src/core/api/client';
import { useMutation } from '@tanstack/react-query';
import { POST_USER_REGISTERATION_KEY } from '@/src/core/api/keys';
import { toast } from 'sonner';
import { TimeoutError } from 'ky';
import { signupSchemaType } from '@/src/core/schemas';

type IResponse = {
  message: string;
};

interface IRequestProps extends signupSchemaType {
  role: string;
  phoneNumber?: string;
  country?: string;
}

const postUserRegisteration = async (payload: IRequestProps) => {
  try {
    const res = await clientApi.post('auth/api/user-registeration', {
      json: { ...payload, role: payload.role.toUpperCase() },
      // credentials: 'include',
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

export const useMutationPostUserRegisteration = () => {
  return useMutation({
    mutationFn: (payload: IRequestProps) =>
      postUserRegisteration(payload),
    mutationKey: [POST_USER_REGISTERATION_KEY],
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data: IResponse) => {
      toast.success(data.message);
    },
  });
};
