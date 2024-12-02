import useSWR from 'swr';
import { useState, useCallback } from 'react';
import { data } from '../data.mock';

type ProposalItem = {
  title: string;
  creator: { avatar: string; name: string; surname: string };
  commitment: number;
  status: string;
};

type UseProposalsReturn = {
  proposals: ProposalItem[];
  proposalsCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loadMore: () => void;
  filterProposalsByStatus: (status: string) => ProposalItem[];
  filterProposals: () => ProposalItem[];
};

const fetchProposals = async () => {
  return new Promise<{ proposals: ProposalItem[], newProposals: ProposalItem[] }>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export const useProposals = (): UseProposalsReturn => {
  const { data: fetchedData } = useSWR('proposals', fetchProposals);

  const [activeTab, setActiveTab] = useState('all');
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
      setProposals((prevProposals) => [...prevProposals, ...fetchedData.newProposals]);
    }
  };

  const filterProposalsByStatus = useCallback((status: string) => {
    const filteredProposals = status === 'all' ? proposals : proposals.filter(proposal => proposal.status === status);
    return filteredProposals;
  }, [proposals]);

  const filterProposals = () => {
    return proposals;
  };

  const proposalsCount = proposals.length;

  return {
    proposals,
    proposalsCount,
    activeTab,
    setActiveTab,
    loadMore,
    filterProposalsByStatus,
    filterProposals
  };
};
