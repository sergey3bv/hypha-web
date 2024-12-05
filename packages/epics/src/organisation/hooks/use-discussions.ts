import useSWR from 'swr';
import { useState, useMemo, useEffect } from 'react';
import { data } from './use-discussions.mock';

type Creator = { avatar: string; name: string; surname: string };

type DiscussionItem = {
  creator: Creator;
  image: string;
  title: string;
  description: string;
  views: number;
  comments: number;
  isLoading?: boolean | undefined;
  status: string;
};

type UseDiscussionsReturn = {
  discussions: DiscussionItem[];
  discussionsCount: number;
  activeStatus: string;
  setActiveStatus: (status: string) => void;
  loadMore: () => void;
  filteredDiscussions: DiscussionItem[];
  isLoading: boolean;
  hasMore: boolean;
};

const fetchDiscussions = async (page: number, limit: number) => {
  return new Promise<{
    discussions: DiscussionItem[];
    total: number;
  }>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = page * limit;
      const discussions = data.slice(start, end);
      resolve({
        discussions,
        total: data.length,
      });
    }, 1000);
  });
};

export const useDiscussions = (): UseDiscussionsReturn => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 3;

  const { data: fetchedData, isLoading } = useSWR(
    ['discussions', page, limit],
    () => fetchDiscussions(page, limit),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const [allDiscussions, setAllDiscussions] = useState<DiscussionItem[]>([]);

  useEffect(() => {
    if (fetchedData) {
      setAllDiscussions((prev) => [...prev, ...fetchedData.discussions]);
    }
  }, [fetchedData]);

  const filteredDiscussions = useMemo(() => {
    return activeStatus === 'all'
      ? allDiscussions
      : allDiscussions.filter(
          (discussion) => discussion.status === activeStatus
        );
  }, [activeStatus, allDiscussions]);

  const discussionsCount = useMemo(
    () => filteredDiscussions.length,
    [filteredDiscussions]
  );

  const hasMore = fetchedData
    ? fetchedData.total > allDiscussions.length
    : false;

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    discussions: filteredDiscussions,
    discussionsCount,
    activeStatus,
    setActiveStatus,
    loadMore,
    filteredDiscussions,
    isLoading,
    hasMore,
  };
};
