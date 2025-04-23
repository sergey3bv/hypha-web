'use client';

import { CreateAgreementBaseFields, SidePanel } from '@hypha-platform/epics';
import { notFound, useParams } from 'next/navigation';
import { useMe } from '@hypha-platform/core/client';
import { isPluginName, PLUGINS } from './plugins';

export default function CreateAgreement() {
  const { lang, id, plugin } = useParams();
  const { person } = useMe();
  const isPlugin = isPluginName(plugin);

  if (!isPlugin) {
    return notFound();
  }

  const Plugin = PLUGINS[plugin];

  return (
    <SidePanel>
      <CreateAgreementBaseFields
        creator={{
          avatar: person?.avatarUrl || '',
          name: person?.name || '',
          surname: person?.surname || '',
        }}
        closeUrl={`/${lang}/dho/${id}/agreements`}
        onCreate={() => {
          console.log('Publish proposal');
        }}
        isLoading={false}
      >
        <Plugin />
      </CreateAgreementBaseFields>
    </SidePanel>
  );
}
