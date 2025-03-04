'use client';

import React, { useId } from 'react';
import useSWR from 'swr';
import { Person } from '@hypha-platform/core';
import { useJwt } from './use-jwt';

interface UseMeHookProps {
  newUserRedirectPath?: string;
}

export const useMe = ({ newUserRedirectPath = '' }: UseMeHookProps = {}): {
  person: Person | undefined;
  isLoading: boolean;
} => {
  const { jwt, isLoadingJwt } = useJwt();
  const randomId = useId();

  const endpoint = React.useMemo(
    () => `/api/v1/people/me/${randomId}`,
    [randomId],
  );

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
