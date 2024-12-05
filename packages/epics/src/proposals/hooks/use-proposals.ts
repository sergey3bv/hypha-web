import useSWR from 'swr';
import { useState, useMemo, useEffect } from 'react';
import { data } from './use-proposals.mock';

type ProposalItem = {
  title: string;
  creator: { avatar: string; name: string; surname: string };
  commitment: number;
  status: string;
};

type UseProposalsReturn = {
  proposals: ProposalItem[];
  proposalsCount: number;
  activeStatus: string;
  setActiveStatus: (status: string) => void;
  loadMore: () => void;
  filteredProposals: ProposalItem[];
  isLoading: boolean;
  hasMore: boolean;
};

const fetchProposals = async (page: number, limit: number) => {
  return new Promise<{ proposals: ProposalItem[]; total: number }>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = page * limit;
      const proposals = data.slice(start, end);
      resolve({
        proposals,
        total: data.length,
      });
    }, 1000);
  });
};

export const useProposals = (): UseProposalsReturn => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 4;

  const { data, isLoading } = useSWR(
    ['proposals', page, limit], 
    () => fetchProposals(page, limit)
  );

  const [proposals, setProposals] = useState<ProposalItem[]>([]);

  useEffect(() => {
    if (data && data.proposals.length > 0) {
      setProposals((prev) => [...prev, ...data.proposals]);
    }
  }, [data]);

  const filteredProposals = useMemo(() => {
    return activeStatus === 'all'
      ? proposals
      : proposals.filter((proposal) => proposal.status === activeStatus);
  }, [activeStatus, proposals]);

  const proposalsCount = useMemo(() => filteredProposals.length, [filteredProposals]);

  const hasMore = data ? data.total > proposals.length : false;

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    proposals: filteredProposals,
    proposalsCount,
    activeStatus,
    setActiveStatus,
    loadMore,
    filteredProposals,
    isLoading,
    hasMore,
  };
};
