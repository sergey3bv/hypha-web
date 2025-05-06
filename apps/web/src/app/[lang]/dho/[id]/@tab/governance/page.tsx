import { Locale } from '@hypha-platform/i18n';
import { DocumentSection } from '@hypha-platform/epics';
import { useSpaceDocuments } from '@web/hooks/use-space-documents';

type PageProps = {
  params: Promise<{ lang: Locale; id: string }>;
};

export default async function AgreementsPage(props: PageProps) {
  const params = await props.params;

  const { lang, id } = params;

  const basePath = `/${lang}/dho/${id}/governance`;

  return (
    <div className="flex flex-col gap-6 py-4">
      <DocumentSection
        basePath={`${basePath}/proposal`}
        useDocuments={useSpaceDocuments}
        documentState="proposal"
        label="On Voting"
        hasSearch={true}
      />
      <DocumentSection
        basePath={`${basePath}/agreement`}
        useDocuments={useSpaceDocuments}
        documentState="agreement"
        label="Accepted"
        hasSearch={true}
      />
      <DocumentSection
        basePath={`${basePath}/agreement`}
        useDocuments={useSpaceDocuments}
        documentState="agreement"
        label="Rejected"
        hasSearch={true}
      />
    </div>
  );
}
