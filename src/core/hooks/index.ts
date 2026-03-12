'use client';

import { useEffect, useState } from 'react';

export const useBreakPoint = () => {
  const [breakPoint, setBreakPoint] = useState<string | null>(null);

  useEffect(() => {
    const getBreakPoint = () => {
      const width = window.innerWidth;

      if (width < 640) return 'xs';
      if (width < 768) return 'sm';
      if (width < 1024) return 'md';
      if (width < 1280) return 'lg';
      if (width < 1536) return 'xl';
      return '2xl';
    };

    const handleResize = () => {
      setBreakPoint(getBreakPoint());
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakPoint;
};
