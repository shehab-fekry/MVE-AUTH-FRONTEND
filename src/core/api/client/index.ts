'use client';

import ky from 'ky';
import Cookie from 'js-cookie';

const cookiesInterceptor = (req: Request) => {
  const accessToken = Cookie.get('accessToken');

  if (accessToken)
    req.headers.set('Authorization', `Bearer ${accessToken}`);
};

export const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
  hooks: {
    beforeRequest: [cookiesInterceptor],
  },
  timeout: 5000,
  throwHttpErrors: false, // prevent ky special HttpErrors
});
