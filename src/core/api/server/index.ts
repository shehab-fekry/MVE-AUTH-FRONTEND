import ky from 'ky';
import { cookies } from 'next/headers';

const Cookies = await cookies();

const CookiesInterceptor = (req: Request) => {
  const accessToken = Cookies.get('accessToken')?.value;

  if (accessToken)
    req.headers.set('Authorization', `Bearer ${accessToken}`);
};

export const serverApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
  hooks: {
    beforeRequest: [CookiesInterceptor],
  },
  timeout: 5000,
  throwHttpErrors: false, // prevent ky special HttpErrors
  // credentials: 'include',
});
