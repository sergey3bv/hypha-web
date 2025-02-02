'use client';

import useSWR from 'swr';

export const useProfile = ({ address }: { address?: string }) => {
  const { data: profile, isLoading } = useSWR(
    address ? [address] : null,
    async ([address]) => {
      return {
        address,
        name: 'John Doe',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
      };
    },
  );

  return { profile, isLoading };
};
