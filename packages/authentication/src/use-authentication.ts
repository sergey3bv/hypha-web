'use client';

import { usePrivy } from '@privy-io/react-auth';

export const useAuthentication = () => {
  const { login, authenticated } = usePrivy();

  return { login, isAuthenticated: authenticated };
};
