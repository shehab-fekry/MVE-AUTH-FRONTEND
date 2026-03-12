'use client';

import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/src/components/ui/drawer';

import { useBreakPoint } from '@/src/core/hooks';

export function Popup({
  title,
  description,
  content,
  open,
  setOpen,
}: {
  title: string;
  description: string;
  content: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const bp = useBreakPoint();
  const isDesktop = bp !== 'xs' && bp !== 'sm';

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-140'>
          <DialogHeader className='hidden'>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className='hidden'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>
  );
}
