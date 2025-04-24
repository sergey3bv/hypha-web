'use client';

import { useParams } from 'next/navigation';
import { useMe } from '@hypha-platform/core/client';
import { Plugin } from '../plugins';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAgreementFiles,
  schemaCreateAgreement,
} from '@hypha-platform/core/client';
import { z } from 'zod';
import React from 'react';
import { Button, Separator } from '@hypha-platform/ui';
import { CreateAgreementBaseFields, SidePanel } from '@hypha-platform/epics';

const schemaCreateAgreementForm =
  schemaCreateAgreement.extend(createAgreementFiles);

export default function CreateAgreement() {
  const { lang, id } = useParams();
  const { person } = useMe();

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
          />
          <Separator />
          <Plugin name="propose-contribution" />
          <Separator />
          <div className="flex justify-end w-full">
            <Button type="submit">Publish</Button>
          </div>
        </form>
      </FormProvider>
    </SidePanel>
  );
}
