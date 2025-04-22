'use client';

import { notFound, useParams } from 'next/navigation';
import { useMe } from '@hypha-platform/core/client';
import { isPluginName, PLUGINS } from './plugins';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAgreementFiles,
  schemaCreateAgreement,
} from '@hypha-platform/core/client';
import { z } from 'zod';
import React from 'react';
import dynamic from 'next/dynamic';

const CreateAgreementBaseFields = dynamic(() =>
  import('@hypha-platform/epics').then((mod) => mod.CreateAgreementBaseFields),
);
const SidePanel = dynamic(() =>
  import('@hypha-platform/epics').then((mod) => mod.SidePanel),
);

const schemaCreateAgreementForm =
  schemaCreateAgreement.extend(createAgreementFiles);

export default function CreateAgreement() {
  const { lang, id, plugin } = useParams();
  const { person } = useMe();
  const isPlugin = isPluginName(plugin);

  const form = useForm<z.infer<typeof schemaCreateAgreementForm>>({
    resolver: zodResolver(schemaCreateAgreementForm),
    defaultValues: {
      title: '',
      description: '',
      leadImage: undefined,
    },
  });

  const handleCreate = React.useCallback(
    async (data: z.infer<typeof schemaCreateAgreementForm>) => {
      // TODO: Implement agreement creation logic
      console.log('Creating agreement with data:', data);
    },
    [],
  );

  if (!isPlugin) {
    return notFound();
  }

  const Plugin = PLUGINS[plugin];

  return (
    <SidePanel>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreate)}
          className="flex flex-col gap-5"
        >
          <CreateAgreementBaseFields
            creator={{
              avatar: person?.avatarUrl || '',
              name: person?.name || '',
              surname: person?.surname || '',
            }}
            closeUrl={`/${lang}/dho/${id}/agreements`}
            isLoading={false}
          >
            <Plugin />
          </CreateAgreementBaseFields>
        </form>
      </FormProvider>
    </SidePanel>
  );
}
