'use client';

import { CreateAgreementForm } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';
import { SidePanel } from '../../_components/side-panel';

export default function Loading() {
  const { lang, id } = useParams();

  return (
    <SidePanel>
      <CreateAgreementForm
        creator={{
          avatar: '',
          name: '',
          surname: '',
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
