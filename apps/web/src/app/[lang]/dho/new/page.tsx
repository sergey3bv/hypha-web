import { Locale } from '@hypha-platform/i18n';

type PageProps = {
  params: { lang: Locale; id: string };
};

export default async function Index({
  params: { lang, id: daoSlug },
}: PageProps) {
  return (
    <div>
      <h1>New DHO</h1>
    </div>
  );
}
