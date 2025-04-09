'use client';

import { useParams } from 'next/navigation';
import { DocumentSection } from '@hypha-platform/epics';
import { Button } from '@hypha-platform/ui';
import Link from 'next/link';
import { RxCross1 } from 'react-icons/rx';
import { useSpaceDocuments } from '@web/hooks/use-space-documents';
import { SidePanel } from '../../_components/side-panel';

export default function AgreementsHistory() {
  const { lang, id } = useParams();
  return (
    <SidePanel>
      <div className="flex flex-col gap-4">
        <DocumentSection
          basePath={`/${lang}/dho/${id}/agreements`}
          useDocuments={useSpaceDocuments}
          documentState="agreement"
          label="History"
          headSectionButton={
            <Button
              variant="ghost"
              colorVariant="neutral"
              className="flex items-center"
              asChild
            >
              <Link href={`/${lang}/dho/${id}/agreements`} scroll={false}>
                <RxCross1 className="ml-2" />
                Close
              </Link>
            </Button>
          }
        />
      </div>
    </SidePanel>
  );
}
