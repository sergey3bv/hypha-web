'use client';
import { FC } from 'react';
import { useProposals } from '../hooks/use-proposals';
import { ProposalTabs } from './proposal-tabs';
import { ProposalsFilter } from './proposal-filter';
import ProposalList from './proposal-list';
import ProposalListSkeleton from './proposal-list-skeleton';

type ProposalSectionProps = Record<string, never>;

export const ProposalsSection: FC<ProposalSectionProps> = () => {
  const {
    proposalsCount,
    activeStatus,
    setActiveStatus,
    loadMore,
    filteredProposals,
    isLoading,
  } = useProposals();

  const renderContent = () => {
    if (isLoading) {
      return <div className='w-full'><ProposalListSkeleton /></div>;
    }

    return (
      <>
        <ProposalsFilter
          value={activeStatus}
          count={proposalsCount}
          onChange={setActiveStatus}
        />
        <ProposalTabs activeTab={activeStatus} setActiveTab={setActiveStatus} />
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
