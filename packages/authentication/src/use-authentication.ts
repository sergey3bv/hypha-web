'use client';

import { usePrivy } from '@privy-io/react-auth';

export const useAuthentication = () => {
  const { login, authenticated, logout, user } = usePrivy();
  console.debug('useAuthentication', { user });

  return {
    login,
    isAuthenticated: authenticated,
    logout,
    ...(authenticated &&
      user?.wallet?.address && {
        user: { address: user?.wallet?.address },
      }),
  };
};
