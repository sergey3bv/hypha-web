'use client';

import { CreateAgreementBaseFields, SidePanel } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';
import { useMe } from '@hypha-platform/core/client';

export default function CreateAgreement() {
  const { lang, id } = useParams();
  const { person } = useMe();
  return (
    <SidePanel>
      <CreateAgreementBaseFields
        creator={{
          avatar: person?.avatarUrl || '',
          name: person?.name || '',
          surname: person?.surname || '',
        }}
        closeUrl={`/${lang}/dho/${id}/governance`}
        isLoading={false}
      />
    </SidePanel>
  );
}
