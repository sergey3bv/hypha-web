'use client';

import React from 'react';
import useSWR from 'swr';
import { useAuthentication } from '@hypha-platform/authentication';
import { useRouter } from 'next/navigation';
import { Person } from '@hypha-platform/core';

interface UseMeHookProps {
  newUserRedirectPath?: string;
}

export const useMe = ({ newUserRedirectPath = '' }: UseMeHookProps = {}): {
  person: Person | undefined;
  isLoading: boolean;
} => {
  const { getAccessToken, user } = useAuthentication();
  const endpoint = React.useMemo(() => `/api/v1/people/me`, []);

  const { data: jwt, isLoading: isLoadingJwt } = useSWR(
    user ? [user.id] : null,
    () => getAccessToken(),
  );
  const router = useRouter();

  const { data: person, isLoading: isLoadingPerson } = useSWR(
    jwt ? [endpoint, jwt] : null,
    ([endpoint, jwt]) =>
      fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
  );

  return { person, isLoading: isLoadingJwt || isLoadingPerson };
};
