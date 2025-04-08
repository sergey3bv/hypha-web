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
      creator={{
        avatar: document?.creator?.avatarUrl || '',
        name: document?.creator?.name || '',
        surname: document?.creator?.surname || '',
      }}
      title={document?.title}
      commitment={50}
      status={document?.state}
      isLoading={isLoading}
    />
  );
}
