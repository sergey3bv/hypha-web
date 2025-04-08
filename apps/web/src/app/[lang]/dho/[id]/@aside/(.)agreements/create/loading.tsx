'use client';

import { CreateAgreementForm } from '@hypha-platform/epics';
import { SidePanel } from '../../_components/side-panel';
import { useMe } from '@web/hooks/use-me';

export default function Loading() {
  const { person } = useMe();
  return (
    <SidePanel>
      <CreateAgreementForm
        creator={{
          avatar: person?.avatarUrl || '',
          name: person?.name || '',
          surname: person?.surname || '',
        }}
        closeUrl={``}
        onCreate={() => {
          console.log('Publish proposal');
        }}
        isLoading={true}
      />
    </SidePanel>
  );
}
