import {
  Person,
  FilterParams,
  PaginationMetadata,
} from '@hypha-platform/core/client';

interface UseMeProps {
  newUserRedirectPath?: string;
}

export type UseMeReturn = {
  person: Person | undefined;
  isLoading: boolean;
};
export type UseMe = (props: UseMeProps) => UseMeReturn;

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

export type UseMemberSpacesReturn = {
  members: Person[];
  pagination?: PaginationMetadata;
  isLoading: boolean;
};
export type UseMemberSpaces = () => UseMemberSpacesReturn;
