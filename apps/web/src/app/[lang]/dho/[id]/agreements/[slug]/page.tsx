'use client';

import { AgreementDetail, useAgreementBySlug } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: string; id: string; lang: string }>;
};

export default function Agreements(props: PageProps) {
  const { slug, id, lang } = useParams();
  const { data, isLoading } = useAgreementBySlug(slug as string);

  return (
    <AgreementDetail
      closeUrl={`/${lang}/dho/${id}/agreements`}
      onSetActiveFilter={() => console.log('set active filter')}
      content={data?.content || ''}
      creator={data?.creator}
      title={data?.title}
      commitment={data?.commitment}
      status={data?.status}
      isLoading={isLoading}
      comments={data?.comments}
    />
  );
}
