'use client';

import { FC } from 'react';
import { Text } from '@radix-ui/themes';
import {
  SectionFilter,
  SectionLoadMore,
  SectionTabs,
} from '@hypha-platform/ui/server';
import { Button } from '@hypha-platform/ui';
import { PlusIcon } from '@radix-ui/react-icons';

import { useMembersSection } from '../../hooks/use-members-section';
import { type useMembers } from '../../hooks/types';

import { MembersList } from './members-list';

type MemberSectionProps = {
  basePath: string;
  useMembers: useMembers;
};

export const MembersSection: FC<MemberSectionProps> = ({
  basePath,
  useMembers,
}) => {
  const { pages, isLoading, loadMore, pagination, sortOptions } =
    useMembersSection({ useMembers });

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <SectionFilter
        value={'all'}
        onChange={(value) =>
          console.debug('members-section onChange', { value })
        }
        count={pagination?.total || 0}
        label="Members"
        sortOptions={sortOptions}
      >
        <Button className="ml-2">
          <PlusIcon className="mr-2" />
          Invite member
        </Button>
      </SectionFilter>
      {pagination?.total === 0 ? null : (
        <SectionTabs
          activeTab="all"
          tabs={[
            { label: 'All', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Applicant', value: 'applicant' },
            { label: 'Rejected', value: 'rejected' },
          ]}
          setActiveTab={function (tab: string): void {
            console.error('members-section setActiveTab not implemented', {
              tab,
            });
          }}
        />
      )}
      {pagination?.total === 0 ? (
        <Text className="text-neutra-11 mt-2 mb-6">List is empty</Text>
      ) : (
        Array.from({ length: pages }).map((_, index) => (
          <MembersList
            basePath={basePath}
            page={index + 1}
            key={index}
            useMembers={useMembers}
          />
        ))
      )}
      {pagination?.total === 0 ? null : (
        <SectionLoadMore
          onClick={loadMore}
          disabled={pagination?.totalPages === pages}
          isLoading={isLoading}
        >
          <Text>
            {pagination?.totalPages === pages
              ? 'No more members'
              : 'Load more members'}
          </Text>
        </SectionLoadMore>
      )}
    </div>
  );
};
