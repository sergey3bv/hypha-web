import { data } from './list.mock';

export type Creator = { avatar: string; name: string; surname: string };

export type AgreementItem = {
  title: string;
  creator: Creator;
  commitment: number;
  status: string;
  views: number;
  comments: number;
};

export type PaginationMetadata = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginatedResponse<T> = {
  agreements: T[];
  pagination: PaginationMetadata;
};

export type FilterParams = {
  status?: string;
};

export type PaginationParams = {
  page?: number;
  pageSize?: number;
  filter?: FilterParams;
};

export const fetchAgreements = async ({
  page = 1,
  pageSize = 4,
  filter,
}: PaginationParams): Promise<PaginatedResponse<AgreementItem>> => {
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
