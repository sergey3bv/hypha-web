'use client';

import { CreateForm, SidePanel } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';
import { Locale } from '@hypha-platform/i18n';
import { getDhoPathGovernance } from '../../../@tab/governance/constants';
export default function Loading() {
  const { id, lang } = useParams();

  return (
    <SidePanel>
      <CreateForm
        isLoading={false}
        creator={{
          avatar: 'https://github.com/shadcn.png',
          name: 'Name',
          surname: 'Surname',
        }}
        closeUrl={getDhoPathGovernance(lang as Locale, id as string)}
        type="Discussion"
      />
    </SidePanel>
  );
}
