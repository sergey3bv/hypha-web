'use client';

import React from 'react';
import useSWR from 'swr';
import { useJwt } from './use-jwt';
// TODO: declare UI interface separately
import { Space } from '@hypha-platform/core/client';

type UseSpacesByMemberSlugReturn = {
  spaces: Space[];
  isLoading: boolean;
};

export const useSpacesByMemberSlug = (
  personSlug: string,
): UseSpacesByMemberSlugReturn => {
  const { jwt } = useJwt();

  const endpoint = React.useMemo(
    () => `/api/v1/people/${personSlug}/spaces`,
    [personSlug],
  );

  const { data: spaces, isLoading } = useSWR(
    jwt ? [endpoint, jwt] : null,
    ([endpoint]) =>
      fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
  );

  return { spaces: spaces || [], isLoading };
};
