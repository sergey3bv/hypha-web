'use client';

import { CreateForm } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';

export default function Loading() {
  const { lang } = useParams();

  return (
    <CreateForm
      isLoading={false}
      creator={{
        avatar: 'https://github.com/shadcn.png',
        name: 'Name',
        surname: 'Surname',
      }}
      closeUrl={`/${lang}/my-spaces`}
      type="space"
    />
  );
}
