import useSWR from 'swr';
import { AgreementItem, PaginationMetadata, FilterParams, fetchAgreements } from '@hypha-platform/graphql/rsc';

type UseAgreementsReturn = {
  agreements: AgreementItem[];
  pagination?: PaginationMetadata;
  isLoading: boolean;
};

export const useAgreements = ({
  page,
  filter,
}: {
  page: number;
  filter?: FilterParams;
}): UseAgreementsReturn => {
  const { data, isLoading } = useSWR(['agreements', page, filter], () =>
    fetchAgreements({ page, filter })
  );

  return {
    agreements: data?.agreements || [],
    pagination: data?.pagination,
    isLoading,
  };
};
