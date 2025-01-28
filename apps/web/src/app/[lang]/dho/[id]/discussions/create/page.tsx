'use client';

import { CreateForm } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';

export default function Discussion() {
  const { id, lang } = useParams();

  return (
    <CreateForm
      isLoading={false}
      creator={{
        avatar: 'https://github.com/shadcn.png',
        name: 'Name',
        surname: 'Surname',
      }}
      closeUrl={`/${lang}/dho/${id}/agreements`}
      type="Discussion"
    />
  );
}
