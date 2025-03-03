import { Person } from '@hypha-platform/core';

interface UseMeProps {
  newUserRedirectPath?: string;
}

export type UseMeReturn = {
  person: Person | undefined;
  isLoading: boolean;
};
export type UseMe = (props: UseMeProps) => UseMeReturn;
