'use client';
import { FC } from 'react';
import { useAgreements } from '../hooks/use-agreements';
import { AgreementTabs } from './agreement-tabs';
import { AgreementFilter } from './agreement-filter';
import AgreementsList from './agreements-list';

type AgreementsSectionProps = Record<string, never>;

export const AgreementsSection: FC<AgreementsSectionProps> = () => {
  const {
    agreementsCount,
    activeStatus,
    setActiveStatus,
    loadMore,
    filteredAgreements,
    isLoading,
  } = useAgreements();

  const renderContent = () => {
    return (
      <>
        <AgreementFilter
          value={activeStatus}
          count={agreementsCount}
          onChange={setActiveStatus}
        />
        <AgreementTabs
          activeTab={activeStatus}
          setActiveTab={setActiveStatus}
        />
        <AgreementsList
          isLoading={isLoading}
          agreements={filteredAgreements}
          onLoadMore={loadMore}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {renderContent()}
    </div>
  );
};
