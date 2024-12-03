import useSWR from 'swr';
import { useState, useMemo } from 'react';
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
};

const fetchProposals = async () => {
  return new Promise<{
    proposals: ProposalItem[];
    newProposals: ProposalItem[];
  }>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export const useProposals = (): UseProposalsReturn => {
  const { data: fetchedData, isLoading } = useSWR('proposals', fetchProposals);

  const [activeStatus, setActiveStatus] = useState('all');
  const [proposals, setProposals] = useState<ProposalItem[]>([]);

  const loadInitialData = () => {
    if (fetchedData) {
      setProposals(fetchedData.proposals);
    }
  };

  if (fetchedData && proposals.length === 0) {
    loadInitialData();
  }

  const loadMore = () => {
    if (fetchedData) {
      setProposals((prevProposals) => [
        ...prevProposals,
        ...fetchedData.newProposals,
      ]);
    }
  };

  const filteredProposals = useMemo(() => {
    return activeStatus === 'all'
      ? proposals
      : proposals.filter((proposal) => proposal.status === activeStatus);
  }, [activeStatus, proposals]);

  const proposalsCount = useMemo(() => proposals.length, [proposals]);

  return {
    proposals,
    proposalsCount,
    activeStatus,
    setActiveStatus,
    loadMore,
    filteredProposals,
    isLoading: isLoading,
  };
};
