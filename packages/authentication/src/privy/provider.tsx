import { AuthContext } from '../shared/context';

import { usePrivyAuthenticationAdapter } from './use-privy-authentication-adapter';

export function PrivyAuthProvider({ children }: { children: React.ReactNode }) {
  const hook = usePrivyAuthenticationAdapter();
  return <AuthContext.Provider value={hook}>{children}</AuthContext.Provider>;
}
