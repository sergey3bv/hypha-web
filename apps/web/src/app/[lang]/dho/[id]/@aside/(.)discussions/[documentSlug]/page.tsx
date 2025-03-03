'use client';

import { DiscussionDetail } from '@hypha-platform/epics';
import { SidePanel } from '../../_components/side-panel';
import { Locale } from '@hypha-platform/i18n';
import { useParams } from 'next/navigation';
import { useDocumentSlug } from '@web/hooks/use-document-slug';
import { useDocumentBySlug } from '@web/hooks/use-document-by-slug';
import { getDhoPathAgreements } from '../../../agreements/constants';
import { useDiscussionByDocumentSlug } from '@web/hooks/use-discussion-by-document-slug';

type PageProps = {
  params: Promise<{ slug: string; id: string; lang: string }>;
};

export default function Agreements(props: PageProps) {
  const { id, lang } = useParams();
  const documentSlug = useDocumentSlug();
  const { discussion } = useDiscussionByDocumentSlug(documentSlug);
  const { document } = useDocumentBySlug(documentSlug);

  return (
    <SidePanel>
      <DiscussionDetail
        creator={{
          avatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
          name: 'Jane',
          surname: 'Doe',
        }}
        title={document?.title}
        isLoading={false}
        content={document?.description ?? ''}
        image={'/placeholder/space-lead-image.png'}
        messages={discussion || []}
        closeUrl={getDhoPathAgreements(lang as Locale, id as string)}
      />
    </SidePanel>
  );
}
