'use client';

import React from 'react';
import useSWR from 'swr';
import { usePersonSlug } from './use-person-slug';

export const useMemberBySlug = (slug: string) => {
  const personSlug = usePersonSlug();
  const endpoint = React.useMemo(
    () => `/api/v1/people/${personSlug}/`,
    [personSlug],
  );
  console.debug('useMembers', { endpoint });
  const { data: person, isLoading } = useSWR([endpoint], ([endpoint]) =>
    fetch(endpoint).then((res) => res.json()),
  );
  return { person, isLoading };
};
