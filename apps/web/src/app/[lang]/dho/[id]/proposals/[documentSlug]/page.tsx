'use client';

import { ProposalDetail } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';
import { getDhoPathAgreements } from '../../agreements/constants';
import { Locale } from '@hypha-platform/i18n';
import { useDocumentBySlug } from '@web/hooks/use-document-by-slug';
import { useDocumentSlug } from '@web/hooks/use-document-slug';

type PageProps = {
  params: Promise<{ slug: string; id: string; lang: string }>;
};

export default function Proposal(props: PageProps) {
  const { id, lang } = useParams();
  const documentSlug = useDocumentSlug();
  const { document, isLoading } = useDocumentBySlug(documentSlug);

  return (
    <ProposalDetail
      closeUrl={getDhoPathAgreements(lang as Locale, id as string)}
      onAccept={() => console.log('accept')}
      onReject={() => console.log('reject')}
      onSetActiveFilter={() => console.log('set active filter')}
      content={document?.description}
      // TODO: connect to api
      creator={{
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Jane',
        surname: 'Doe',
      }}
      title={document?.title}
      commitment={50}
      status={document?.state}
      isLoading={isLoading}
    />
  );
}
