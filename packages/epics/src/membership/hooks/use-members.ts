'use client';

import useSWR from 'swr';
import {
  MemberItem,
  PaginationMetadata,
  FilterParams,
} from '@hypha-platform/graphql/rsc';
import { fetchSpaceMemberBySpaceSlug } from '../actions/fetch-members';
import { Person } from '@hypha-platform/core';
import { useSpaceSlug } from '../../space/hooks/use-space-slug';

type UseMembersReturn = {
  members: Person[];
  pagination?: PaginationMetadata;
  isLoading: boolean;
};

export const useMembers = ({
  page = 1,
  filter,
}: {
  page?: number;
  filter?: FilterParams<MemberItem>;
}): UseMembersReturn => {
  const spaceSlug = useSpaceSlug();

  const { data: response, isLoading } = useSWR(['members', page, filter], () =>
    fetchSpaceMemberBySpaceSlug(
      { spaceSlug },
      { pagination: { page, pageSize: 10 } },
    ),
  );

  return {
    members: response?.data || [],
    pagination: response?.pagination,
    isLoading,
  };
};
