import { getDaoDetail } from '@hypha-platform/graphql/rsc';
import { getDictionary, Locale } from '@hypha-platform/i18n';

const token = process.env.DGRAPH_ACCESS_TOKEN as string;

type PageProps = {
  params: { lang: Locale, id: string };
};

export default async function Index({ params: { lang, id: daoSlug } }: PageProps) {
  const t = await getDictionary(lang);
  const dao = await getDaoDetail({ token, daoSlug });
  return (
    <div>
      {t('DHO Dashboard')}
      <pre>{JSON.stringify(dao, null, 2)}</pre>
    </div>
  );
}
