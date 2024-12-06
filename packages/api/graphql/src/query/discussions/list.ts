import { data } from './list.mock';

type Creator = { avatar: string; name: string; surname: string };

export type DiscussionItem = {
  creator?: Creator;
  image?: string;
  title?: string;
  description?: string;
  views?: number;
  comments?: number;
  isLoading?: boolean | undefined;
  status: string;
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
  discussions: T[];
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

export const fetchDiscussions = async ({
  page = 1,
  pageSize = 3,
  filter,
}: PaginationParams): Promise<PaginatedResponse<DiscussionItem>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = filter
        ? data.filter((discussion) => discussion.status === filter.status)
        : data;

      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const discussions = filteredData.slice(start, end);
      const total = filteredData.length;
      const totalPages = Math.ceil(total / pageSize);

      resolve({
        discussions,
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
