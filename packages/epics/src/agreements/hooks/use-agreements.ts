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

type FilterParams = {
  status?: string;
};

type PaginationParams = {
  page?: number;
  pageSize?: number;
  filter?: FilterParams;
};

const fetchAgreements = async ({
  page = 1,
  pageSize = 4,
  filter,
}: PaginationParams): Promise<PaginatedResponse<AgreementItem>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = filter
        ? data.filter(
            (agreement) =>
              agreement.status === filter.status || filter.status === 'all'
          )
        : data;
      console.debug('fetchAgreements', {
        data,
        filteredData,
        page,
        pageSize,
        filter,
      });

      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const agreements = filteredData.slice(start, end);
      const total = filteredData.length;
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

  console.debug('useAgreements', { data });

  return {
    agreements: data?.agreements || [],
    pagination: data?.pagination,
    isLoading,
  };
};
