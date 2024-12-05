import useSWR from 'swr';
import { useState, useMemo, useCallback } from 'react';
import { data } from './use-agreements.mock';

type Creator = { avatar: string; name: string; surname: string };

type AgreementItem = {
  title: string;
  creator: Creator;
  commitment: number;
  status: string;
  views: number;
  comments: number;
};

type PaginationMetadata = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type PaginatedResponse<T> = {
  agreements: T[];
  pagination: PaginationMetadata;
};

type PaginationParams = {
  page?: number;
  pageSize?: number;
};

const fetchAgreements = async ({
  page = 1,
  pageSize = 10,
}: PaginationParams): Promise<PaginatedResponse<AgreementItem>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const agreements = data.slice(start, end);
      const total = data.length;
      const totalPages = Math.ceil(total / pageSize);

      resolve({
        agreements,
        pagination: {
          total,
          page,
          pageSize,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      });
    }, 1000);
  });
};

type UseAgreementsReturn = {
  agreements: AgreementItem[];
  pagination?: PaginationMetadata;
  agreementsCount: number;
  activeStatus: string;
  setActiveStatus: (status: string) => void;
  loadMore: () => void;
  filteredAgreements: AgreementItem[];
  isLoading: boolean;
};

export const useAgreements = (): UseAgreementsReturn => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [pageSize, setPageSize] = useState(4);

  const { data, isLoading } = useSWR(
    ['agreements', pageSize],
    () => fetchAgreements({ pageSize }),
  );

  const filteredAgreements = useMemo(() => {
    const agreements = data?.agreements || [];
    return activeStatus === 'all'
      ? agreements
      : agreements.filter((agreement) => agreement.status === activeStatus);
  }, [activeStatus, data?.agreements]);

  const agreementsCount = useMemo(
    () => filteredAgreements?.length || 0,
    [filteredAgreements]
  );


  const loadMore = useCallback(() => {
    if (!data?.pagination.hasNextPage) return;
    setPageSize(pageSize + 4);
  }, [pageSize, data?.pagination.hasNextPage]);

  return {
    agreements: data?.agreements || [],
    pagination: data?.pagination,
    agreementsCount,
    activeStatus,
    setActiveStatus,
    loadMore,
    filteredAgreements,
    isLoading,
  };
};
