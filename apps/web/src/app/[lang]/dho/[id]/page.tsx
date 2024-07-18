import { getDictionary, Locale } from '@hypha-platform/i18n';

type PageProps = {
  params: { lang: Locale };
};

export default async function Index({ params: { lang } }: PageProps) {
  const t = await getDictionary(lang);
  return (
    <div>
      {t('DHO Dashboard')}
    </div>
  );
}
