'use client';

import React, { useContext } from 'react';
import { AuthContext } from './shared/context';

export const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthentication must be used within AuthProvider');
  }

  return context;
};
