import { Creator } from '../members/types';
import { PaginationMetadata, PaginationParams } from '../types';
import { data } from './list.mock';

export type AgreementItem = {
  title: string;
  creator: Creator;
  commitment: number;
  status: string;
  views: number;
  comments: number;
};

export type PaginatedAgreementsResponse = {
  agreements: AgreementItem[];
  pagination: PaginationMetadata;
};

export const fetchAgreements = async ({
  page = 1,
  pageSize = 4,
  filter,
}: PaginationParams): Promise<PaginatedAgreementsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = filter
        ? data.filter((agreement) => agreement.status === filter.status)
        : data;

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
