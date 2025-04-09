'use client';

import { useConfig } from 'wagmi';
import { CreateSpaceForm } from '@hypha-platform/epics';
import { useParams, useRouter } from 'next/navigation';
import { useJwt } from '@web/hooks/use-jwt';
import { useCreateSpaceOrchestrator } from '@hypha-platform/core/client';
import React from 'react';
import { getDhoPathAgreements } from '../../dho/[id]/agreements/constants';
import { Locale } from '@hypha-platform/i18n';
import { LoadingBackdrop } from '@hypha-platform/ui/server';
import { Button } from '@hypha-platform/ui';
import { useMe } from '@web/hooks/use-me';

export default function CreateSpacePage() {
  const { lang } = useParams();
  const router = useRouter();
  const config = useConfig();
  const { person } = useMe();
  const { jwt } = useJwt();
  const {
    createSpace,
    reset,
    currentAction,
    isError,
    isPending,
    progress,
    space: { slug: spaceSlug },
  } = useCreateSpaceOrchestrator({ authToken: jwt, config });

  React.useEffect(() => {
    if (progress === 100 && spaceSlug) {
      router.push(getDhoPathAgreements(lang as Locale, spaceSlug));
    }
  }, [progress, spaceSlug]);

  return (
    <LoadingBackdrop
      progress={progress}
      isLoading={isPending}
      message={
        isError ? (
          <div className="flex flex-col">
            <div>Ouh Snap. There was an error</div>
            <Button onClick={reset}>Reset</Button>
          </div>
        ) : (
          <div>{currentAction}</div>
        )
      }
      className="-m-9"
    >
      <CreateSpaceForm
        isLoading={false}
        creator={{ name: person?.name, surname: person?.surname }}
        closeUrl={`/${lang}/my-spaces`}
        onCreate={createSpace}
      />
    </LoadingBackdrop>
  );
}
