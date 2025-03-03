'use client';
import { AgreementDetail } from '@hypha-platform/epics';
import { SidePanel } from '../../_components/side-panel';
import { useParams } from 'next/navigation';
import { getDhoPathAgreements } from '../../../agreements/constants';
import { Locale } from '@hypha-platform/i18n';
import { useDocumentBySlug } from '@web/hooks/use-document-by-slug';

export default function Agreements() {
  const { slug, id, lang } = useParams();
  const { document, isLoading } = useDocumentBySlug(slug as string);

  return (
    <SidePanel>
      <AgreementDetail
        closeUrl={getDhoPathAgreements(lang as Locale, id as string)}
        onSetActiveFilter={() => console.log('set active filter')}
        content={document?.description || ''}
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
        comments={[
          {
            id: '1',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            author: {
              avatar: 'https://github.com/shadcn.png',
              name: 'Name',
              surname: 'Surname',
            },
            likes: 16,
          },
          {
            id: '2',
            comment:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            author: {
              avatar: 'https://github.com/shadcn.png',
              name: 'Name',
              surname: 'Surname',
            },
            likes: 16,
          },
          {
            id: '3',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            author: {
              avatar: 'https://github.com/shadcn.png',
              name: 'Name',
              surname: 'Surname',
            },
            likes: 16,
          },
        ]}
      />
    </SidePanel>
  );
}
