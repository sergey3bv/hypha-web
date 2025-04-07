'use client';

import { CreateAgreementForm } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';

export default function CreateAgreement() {
  const { lang, id } = useParams();

  return (
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
  );
}
