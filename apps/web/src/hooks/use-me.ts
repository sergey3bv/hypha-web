'use client';

import React from 'react';
import useSWR from 'swr';
import { Person } from '@hypha-platform/core/client';
import { useJwt } from './use-jwt';

export const useMe = (): {
  person: Person | undefined;
  isLoading: boolean;
} => {
  const { jwt, isLoadingJwt } = useJwt();

  const endpoint = React.useMemo(() => '/api/v1/people/me', []);

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
