import { getDictionary, Locale } from "@hypha-platform/i18n";
import { Button } from '@hypha-platform/ui/server';
import Link from 'next/link';
import { PATH_SEGMENT_LANG } from '../../../constants';
import { PATH_SEGMENT_DHO_ID } from '../constants';
import { PATH_ASSIGNMENTS_CREATE } from './create/constants';

type PageProps = {
  params: { lang: Locale; id: string };
};

export default async function AssignmentsPage({
  params: { lang, id },
}: PageProps) {
  const t = await getDictionary(lang);
  const createAssignmentPat = PATH_ASSIGNMENTS_CREATE.replace(
    PATH_SEGMENT_LANG,
    lang
  ).replace(PATH_SEGMENT_DHO_ID, id);
  console.debug('AssignmentsPage', { createAssignmentPat });
  return (
    <>
      <h1>{t('Assignments')}</h1>
      <Link href={createAssignmentPat}>
        <Button>{t('Create a new Proposal')}</Button>
      </Link>
    </>
  );
}
