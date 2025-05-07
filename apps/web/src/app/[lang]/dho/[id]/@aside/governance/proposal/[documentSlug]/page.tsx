'use client';

import { ProposalDetail, SidePanel } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';
import { Locale } from '@hypha-platform/i18n';
import { useDocumentSlug } from '@web/hooks/use-document-slug';
import { useDocumentBySlug } from '@web/hooks/use-document-by-slug';
import { getDhoPathGovernance } from '../../../../@tab/governance/constants';
import { useVote } from '@core/governance';

export default function Agreements() {
  const { id, lang } = useParams();
  const documentSlug = useDocumentSlug();
  const { document, isLoading } = useDocumentBySlug(documentSlug);
  const { handleAccept, handleReject } = useVote({
    proposalId: document?.web3ProposalId,
  });

  return (
    <SidePanel>
      <ProposalDetail
        closeUrl={getDhoPathGovernance(lang as Locale, id as string)}
        onAccept={handleAccept}
        onReject={handleReject}
        content={document?.description}
        creator={{
          avatar: document?.creator?.avatarUrl || '',
          name: document?.creator?.name || '',
          surname: document?.creator?.surname || '',
        }}
        title={document?.title}
        status={document?.state}
        isLoading={isLoading}
        leadImage={document?.leadImage}
        attachments={document?.attachments}
      />
    </SidePanel>
  );
}
