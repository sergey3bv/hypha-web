'use client';

import { ProposalDetail, useProposalBySlug } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';
import { getDhoPathAgreements } from '../../agreements/constants';
import { Locale } from '@hypha-platform/i18n';

type PageProps = {
  params: Promise<{ slug: string; id: string; lang: string }>;
};

export default function Proposal(props: PageProps) {
  const { slug, id, lang } = useParams();
  const { data, isLoading } = useProposalBySlug(slug as string);

  return (
    <ProposalDetail
      closeUrl={getDhoPathAgreements(lang as Locale, id as string)}
      onAccept={() => console.log('accept')}
      onReject={() => console.log('reject')}
      onSetActiveFilter={() => console.log('set active filter')}
      content={data?.content}
      creator={data?.creator}
      title={data?.title}
      commitment={data?.commitment}
      status={data?.status}
      isLoading={isLoading}
    />
  );
}
