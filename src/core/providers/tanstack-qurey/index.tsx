'use client';

import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const TanStackProvider = ({ children }: { children: ReactNode }) => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default TanStackProvider;
