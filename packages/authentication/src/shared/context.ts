'use client';

import React from 'react';
import { AuthHook } from './types';

export const AuthContext = React.createContext<AuthHook | null>(null);
