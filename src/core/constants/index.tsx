import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const ROUTES = {
  home: '/',
  register: '/register',
  registerRole: '/register-role',
  login: '/login',
  forgotPassword: '/forgot-password',
};

export const CARDS = [
  {
    className: 'bg-primary shadow-sm',
    title: 'Your Marketplace. Unlimited Possibilities.',
    description:
      'ONRUSH connects buyers and sellers in one powerful platform. Discover trending products, compare trusted vendors, and launch your own store with tools designed to help you grow fast and sell smarter.',
    button: {
      text: 'Create Your Account',
      variant: 'outline' as const,
      icon: <ArrowRight className='size-5' />,
    },
    href: ROUTES.registerRole,
  },
  {
    className: 'bg-quaternary shadow-sm',
    title: 'Turn Your Products Into a Thriving Online Business',
    description:
      'Reach thousands of ready-to-buy customers, manage your store with powerful tools, and grow your brand without the technical hassle. Set up in minutes and start selling today.',
    button: {
      text: 'Become A Seller',
      variant: 'ghost' as const,
      icon: <ArrowRight className='size-5' />,
    },
    href: `${ROUTES.register}?role=seller`,
  },
  {
    className: 'bg-ternary shadow-sm',
    title: 'Discover Products From Trusted Sellers in One Place',
    description:
      'Explore a wide range of categories, compare prices instantly, and shop with confidence through secure checkout and fast delivery.',
    button: {
      text: 'Start Shopping',
      variant: 'ghost' as const,
      icon: <ArrowRight className='size-5' />,
    },
    href: `${ROUTES.register}?role=customer`,
  },
];

export const ACCOUNTS = [
  {
    role: 'customer',
    title: "I'm A Customer",
    description: 'Browse and purchase products.',
    className: 'hover:bg-ternary hover:text-black',
    img: (
      <Image
        className='translate-x-8 translate-y-14 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-1'
        src={'/customer3.png'}
        width={80}
        height={80}
        alt={'customer'}
      />
    ),
  },
  {
    role: 'seller',
    title: "I'm A Seller",
    description: 'List and sell products.',
    className: 'hover:bg-quaternary hover:text-black',
    img: (
      <Image
        className='mr-2 translate-x-8 translate-y-14 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-1'
        src={'/seller3.png'}
        width={50}
        height={50}
        alt={'seller'}
      />
    ),
  },
];
