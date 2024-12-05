'use client';
import { FC } from 'react';
import { useAgreements } from '../hooks/use-agreements';
import { AgreementTabs } from './agreement-tabs';
import { AgreementFilter } from './agreement-filter';
import AgreementsList from './agreements-list';
import { AgreementsLoadMore } from './agreements-load-more';
import { Text } from '@radix-ui/themes';

type AgreementsSectionProps = Record<string, never>;

export const AgreementsSection: FC<AgreementsSectionProps> = () => {
  const {
    agreementsCount,
    activeStatus,
    setActiveStatus,
    loadMore,
    filteredAgreements,
    isLoading,
    pagination,
  } = useAgreements();

  console.debug("AgreementsSection", {filteredAgreements});

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <AgreementFilter
        value={activeStatus}
        count={agreementsCount}
        onChange={setActiveStatus}
      />
      <AgreementTabs activeTab={activeStatus} setActiveTab={setActiveStatus} />
      <AgreementsList isLoading={isLoading} agreements={filteredAgreements} />
      <AgreementsLoadMore
        onClick={loadMore}
        disabled={!pagination?.hasNextPage}
        isLoading={isLoading}
      >
        <Text>
          {pagination?.hasNextPage
            ? 'Load more agreements'
            : 'No more agreements'}
        </Text>
      </AgreementsLoadMore>
    </div>
  );
};
