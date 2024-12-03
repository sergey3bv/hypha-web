import { Locale } from '@hypha-platform/i18n';
import { MembersGraph } from '@hypha-platform/ui/server';

type PageProps = {
  params: { lang: Locale };
};

export default async function MembersPage({ params: { lang } }: PageProps) {
  return <MembersGraph />;
}
