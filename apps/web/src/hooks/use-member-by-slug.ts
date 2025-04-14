'use client';

import React from 'react';
import useSWR from 'swr';
import { usePersonSlug } from './use-person-slug';
import { useJwt } from '../../../../packages/core/src/people/client/hooks/useJwt';

export const useMemberBySlug = (slug: string) => {
  const { jwt } = useJwt();
  const personSlug = usePersonSlug();
  const endpoint = React.useMemo(
    () => `/api/v1/people/${personSlug}`,
    [personSlug],
  );

  const { data: person, isLoading } = useSWR(
    jwt ? [endpoint] : null,
    ([endpoint]) =>
      fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
  );
  return { person, isLoading };
};
