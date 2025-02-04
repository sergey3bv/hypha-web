'use client';

import { CreateForm } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';
import { getDhoPathAgreements } from '../../agreements/constants';
import { Locale } from '@hypha-platform/i18n';

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
      closeUrl={getDhoPathAgreements(lang as Locale, id as string)}
      type="Discussion"
    />
  );
}
