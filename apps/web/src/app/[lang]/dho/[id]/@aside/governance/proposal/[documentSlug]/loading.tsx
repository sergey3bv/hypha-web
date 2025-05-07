'use client';

import { ProposalDetail, SidePanel } from '@hypha-platform/epics';

export default function Loading() {
  return (
    <SidePanel>
      <ProposalDetail
        closeUrl={''}
        onAccept={() => console.log('accept')}
        onReject={() => console.log('reject')}
        content={''}
        creator={{
          avatar: '',
          name: '',
          surname: '',
        }}
        title={''}
        status={''}
        isLoading={true}
      />
    </SidePanel>
  );
}
