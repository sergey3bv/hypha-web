import { getDictionary, Locale } from '@hypha-platform/i18n';
import { AssignmentCreate } from '@hypha-platform/ui/server';

type PageProps = {
  params: { lang: Locale; id: string };
};

export default async function AssignmentsPage({
  params: { lang, id },
}: PageProps) {
  const t = await getDictionary(lang);
  return <AssignmentCreate title={t('Create Proposal')} />;
}
