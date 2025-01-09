'use client';
import { AgreementDetail } from '@hypha-platform/epics';
import { SidePanel } from '../../_components/side-panel';
import { useAgreementBySlug } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';

export default function Agreements() {
  const { slug, id, lang } = useParams();
  const { data, isLoading } = useAgreementBySlug(slug as string);

  return (
    <SidePanel>
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
    </SidePanel>
  );
}
