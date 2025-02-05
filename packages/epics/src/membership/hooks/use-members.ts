'use client';

import useSWR from 'swr';
import {
  MemberItem,
  PaginationMetadata,
  FilterParams,
} from '@hypha-platform/graphql/rsc';
import { fetchMembers } from '../actions/fetch-members';
import { Person } from '@hypha-platform/core';

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
  const { data: members, isLoading } = useSWR(['members', page, filter], () =>
    fetchMembers({ spaceId: 1 }),
  );

  return {
    members: members || [],
    isLoading,
  };
};
