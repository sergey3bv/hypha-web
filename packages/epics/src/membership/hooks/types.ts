import { FilterParams, PaginationMetadata, Person } from '@hypha-platform/core';

export type UseMembersReturn = {
  members: Person[];
  pagination?: PaginationMetadata;
  isLoading: boolean;
};

export type UseMembersProps = {
  page?: number;
  filter?: FilterParams<Person>;
};

export type UseMembers = (props: UseMembersProps) => UseMembersReturn;
