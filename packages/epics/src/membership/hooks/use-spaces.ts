'use client';

import useSWR from 'swr';
import {
  SpaceType,
  PaginationMetadata,
  SortParams,
  fetchSpaces,
} from '@hypha-platform/graphql/rsc';

type UseSpacesReturn = {
  spaces: SpaceType[];
  pagination?: PaginationMetadata;
  isLoading: boolean;
};

export const useSpaces = ({
  page = 1,
  sort,
}: {
  page?: number;
  sort?: SortParams;
}): UseSpacesReturn => {
  const { data, isLoading } = useSWR(['spaces', page, sort], () =>
    fetchSpaces({ page, sort }),
  );

  return {
    spaces: data?.spaces || [],
    pagination: data?.pagination,
    isLoading,
  };
};
