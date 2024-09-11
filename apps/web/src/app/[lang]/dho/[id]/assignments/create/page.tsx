import { getDictionary, Locale } from '@hypha-platform/i18n';
import { Editor } from '@hypha-platform/ui';

type PageProps = {
  params: { lang: Locale; id: string };
};

export default async function AssignmentsPage({
  params: { lang, id },
}: PageProps) {
  const t = await getDictionary(lang);
  return (
    <div className="flex flex-col w-full">
      <h1>{t('Create Proposal')}</h1>
      <Editor />
    </div>
  );
}
