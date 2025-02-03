'use client';

import { AuthContext } from '../shared/context';

import { useWeb3AuthAuthenticationAdapter } from './use-web3auth-authentication-adapter';

export function Web3AuthAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hook = useWeb3AuthAuthenticationAdapter();
  return <AuthContext.Provider value={hook}>{children}</AuthContext.Provider>;
}
