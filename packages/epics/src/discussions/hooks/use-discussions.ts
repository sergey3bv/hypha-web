'use client';

import useSWR from 'swr';
import {
  DiscussionItem,
  PaginationMetadata,
  FilterParams,
  fetchDiscussions,
} from '@hypha-platform/graphql/rsc';

type UseDiscussionsReturn = {
  discussions: DiscussionItem[];
  pagination?: PaginationMetadata;
  isLoading: boolean;
};

export const useDiscussions = ({
  page = 1,
  filter,
}: {
  page?: number;
  filter?: FilterParams;
}): UseDiscussionsReturn => {
  const { data, isLoading } = useSWR(['discussions', page, filter], () =>
    fetchDiscussions({ page, filter })
  );

  return {
    discussions: data?.discussions || [],
    pagination: data?.pagination,
    isLoading,
  };
};
