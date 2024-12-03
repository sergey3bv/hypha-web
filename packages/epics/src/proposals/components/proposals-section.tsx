'use client';
import { FC } from 'react';
import { useProposals } from '../hooks/use-proposals';
import { ProposalTabs } from './proposal-tabs';
import { ProposalsFilter } from './proposal-filter';
import ProposalList from './proposal-list';

type ProposalSectionProps = Record<string, never>;

export const ProposalsSection: FC<ProposalSectionProps> = () => {
  const {
    proposalsCount,
    activeTab,
    setActiveTab,
    loadMore,
    filterProposalsByStatus,
    proposals,
  } = useProposals();

  const filteredProposals = filterProposalsByStatus(activeTab);

  const isLoading = proposals.length === 0;

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <ProposalsFilter
          value={activeTab}
          count={proposalsCount}
          onChange={setActiveTab}
        />
        <ProposalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProposalList proposals={filteredProposals} onLoadMore={loadMore} />
      </>
    );
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {renderContent()}
    </div>
  );
};
