'use client';

import { useEffect, useRef } from 'react';

import CustomButton from '@/src/components/button';
import Card from '@/src/components/card';
import { generateBackgroundWords } from '@/src/utils';
import Section from '@/src/components/section';
import { CARDS } from '@/src/core/constants';
import { useRouter } from 'next/navigation';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      el.scrollBy({
        top: e.deltaY > 0 ? 900 : -900,
        behavior: 'smooth',
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    // fixed height and width typo layer
    <div className='relative h-[calc(100vh-69px)] w-full overflow-x-hidden'>
      {generateBackgroundWords('ONRUSH')}
      {/* cards scroll layer */}
      <div
        ref={containerRef}
        className='z-10 h-full w-full overflow-x-hidden overflow-y-scroll'
      >
        {CARDS.map((card) => (
          <Section key={card.title}>
            <Card
              className={card.className}
              title={card.title}
              description={card.description}
              footer={
                <CustomButton
                  className='font-semibold'
                  variant={card.button.variant}
                  iconAfter={card.button.icon}
                  onClick={() => router.push(card.href)}
                >
                  {card.button.text}
                </CustomButton>
              }
            />
          </Section>
        ))}
      </div>
    </div>
  );
}
