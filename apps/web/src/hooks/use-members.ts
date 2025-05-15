'use client';

import React from 'react';
import useSWR from 'swr';

import { MemberItem, FilterParams } from '@hypha-platform/graphql/rsc';
import { type UseMembers, type UseMembersReturn } from '@hypha-platform/epics';

import { useJwt } from '@hypha-platform/core/client';

export const useMembers: UseMembers = ({
  page,
  pageSize,
  filter,
  spaceSlug,
}: {
  page?: number;
  pageSize?: number;
  filter?: FilterParams<MemberItem>;
  spaceSlug?: string;
}): UseMembersReturn => {
  const { jwt } = useJwt();

  const endpoint = React.useMemo(() => {
    let url = `/api/v1/spaces/${spaceSlug}/members`;
    const params = new URLSearchParams();

    if (page != null) {
      params.append('page', String(page));
    }
    if (pageSize != null) {
      params.append('pageSize', String(pageSize));
    }

    if ([...params].length > 0) {
      url += `?${params.toString()}`;
    }
    return url;
  }, [spaceSlug, page, pageSize]);

  const { data: response, isLoading } = useSWR(
    jwt ? [endpoint] : null,
    ([endpoint]) =>
      fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
  );

  return {
    members: response?.data || [],
    pagination: response?.pagination,
    isLoading,
  };
};
