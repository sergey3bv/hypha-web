import { fetchAccessToken, getDaoDetail } from '@hypha-platform/graphql/rsc';
import { getDictionary, Locale } from '@hypha-platform/i18n';

type PageProps = {
  params: { lang: Locale, id: string };
};

export default async function Index({ params: { lang, id: daoSlug } }: PageProps) {
  const newtoken = await fetchAccessToken();
  const t = await getDictionary(lang);
  const dao = await getDaoDetail({ token: newtoken.accessJWT, daoSlug });
  return (
    <div>
      {t('DHO Dashboard')}
      <pre>{JSON.stringify(dao, null, 2)}</pre>
    </div>
  );
}
