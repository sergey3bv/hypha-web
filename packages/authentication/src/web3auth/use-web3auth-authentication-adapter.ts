'use client';

import { ADAPTER_STATUS } from '@web3auth/base';
import { useWeb3Auth } from '@web3auth/modal-react-hooks';
import RPC from './ethersRPC';
import { AuthHook } from '../shared/types';

import React from 'react';
import useSWR from 'swr';

export const useWeb3AuthAuthenticationAdapter = (): AuthHook => {
  const { status, connect, logout, provider } = useWeb3Auth();

  const isConnected = React.useMemo(
    () => status === ADAPTER_STATUS.CONNECTED,
    [status],
  );

  const login = React.useCallback(async () => {
    await connect();
  }, [connect]);

  const { data: address, isLoading: isLoadingAddress } = useSWR(
    provider ? ['address', provider] : null,
    async ([_, provider]) => {
      const address = await RPC.getAccounts(provider);
      return address;
    },
  );

  console.debug('useWeb3AuthAuthenticationAdapter', { address });

  return {
    isAuthenticated: isConnected,
    isLoading: isLoadingAddress,
    login,
    logout,
    user: { id: address, wallet: { address } },
    getAccessToken: async () => {
      throw new Error('Not implemented');
    },
  };
};
