'use client';

import { CreateAgreementForm } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';
import { SidePanel } from '../../_components/side-panel';

export default function CreateAgreement() {
  const { lang, id } = useParams();
  return (
    <SidePanel>
      <CreateAgreementForm
        creator={{
          avatar: 'https://github.com/shadcn.png',
          name: 'Name',
          surname: 'Surname',
        }}
        closeUrl={`/${lang}/dho/${id}/agreements`}
        onCreate={() => {
          console.log('Publish proposal');
        }}
        isLoading={false}
      />
    </SidePanel>
  );
}
