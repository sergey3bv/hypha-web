type Creator = { avatar: string; name: string; surname: string };

export type DiscussionItem = {
  comments?: number;
  content?: string;
  creator?: Creator;
  description?: string;
  image?: string;
  isLoading?: boolean | undefined;
  slug?: string;
  status: string;
  title?: string;
  views?: number;
};

type PaginationMetadata = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginatedResponse<T> = {
  discussions: T[];
  pagination: PaginationMetadata;
};

type FilterParams = {
  status?: string;
};

export type PaginationParams = {
  page?: number;
  pageSize?: number;
  filter?: FilterParams;
};
