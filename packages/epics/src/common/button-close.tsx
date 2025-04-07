'use client';

import { Button } from '@hypha-platform/ui';
import { useRouter } from 'next/navigation';
import { RxCross1 } from 'react-icons/rx';

export const ButtonClose = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      colorVariant="neutral"
      className="absolute top-8 right-9"
    >
      Close
      <RxCross1 />
    </Button>
  );
};
