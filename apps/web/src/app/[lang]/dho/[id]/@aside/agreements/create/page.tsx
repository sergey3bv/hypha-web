'use client';

import { CreateAgreementBaseFields, SidePanel } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';
import { useMe } from '@hypha-platform/core/client';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAgreementFiles,
  schemaCreateAgreement,
} from '@hypha-platform/core/client';

import { z } from 'zod';
import React from 'react';
import clsx from 'clsx';

const schemaCreateAgreementForm =
  schemaCreateAgreement.extend(createAgreementFiles);

export type CreateAgreementFormData = z.infer<typeof schemaCreateAgreementForm>;

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

  const handleCreate = React.useCallback(() => {}, []);

  return (
    <SidePanel>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreate)}
          className={clsx('flex flex-col gap-5')}
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
        </form>
      </Form>
    </SidePanel>
  );
}
