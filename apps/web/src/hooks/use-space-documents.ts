'use client';

import React from 'react';
import useSWR from 'swr';
import queryString from 'query-string';

import { FilterParams } from '@hypha-platform/graphql/rsc';

import { useSpaceSlug } from './use-space-slug';
import { Document } from '@hypha-platform/core';

export const useSpaceDocuments = ({
  page = 1,
  filter,
}: {
  page?: number;
  filter?: FilterParams<Pick<Document, 'state'>>;
}) => {
  const spaceSlug = useSpaceSlug();

  const queryParams = React.useMemo(() => {
    const effectiveFilter = { page, ...(filter ? { ...filter } : {}) };
    if (!effectiveFilter || Object.keys(effectiveFilter).length === 0)
      return '';
    return `?${queryString.stringify(effectiveFilter)}`;
  }, [page, filter]);

  const endpoint = React.useMemo(
    () => `/api/v1/spaces/${spaceSlug}/documents${queryParams}`,
    [spaceSlug, page, queryParams],
  );

  const { data: response, isLoading } = useSWR(
    [endpoint],
    ([endpoint]) => fetch(endpoint).then((res) => res.json()),
    { revalidateOnFocus: true },
  );

  return {
    documents: response?.data || [],
    pagination: response?.pagination,
    isLoading,
  };
};
