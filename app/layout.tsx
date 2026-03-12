import './globals.css';
import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';

import HeaderWrapper from '@/src/components/common/wrappers/header-wrapper';
import Providers from '@/src/core/providers';

const mulish = Mulish({
  variable: '--font-mulish',
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'Onrush',
  description: 'Multi Vendor Ecommerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${mulish.variable} antialiased`}>
        <Providers>
          <HeaderWrapper>{children}</HeaderWrapper>
        </Providers>
      </body>
    </html>
  );
}
