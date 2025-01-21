'use client';

import { PrivyProvider, PrivyProviderProps } from '@privy-io/react-auth';
import React from 'react';

export type AuthProviderConfig = {
  type: 'privy';
} & Omit<PrivyProviderProps, 'children'>;

type AuthProviderProps = {
  children: React.ReactNode;
  config: AuthProviderConfig;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  ...providerProps
}) => {
  switch (providerProps.config.type) {
    case 'privy':
      return (
        <PrivyProvider {...providerProps.config}>{children}</PrivyProvider>
      );
    default:
      throw new Error(`Unsupported auth type: ${providerProps.config.type}`);
  }
};
