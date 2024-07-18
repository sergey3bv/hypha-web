import { getDictionary, Locale } from "@hypha-platform/i18n";

type PageProps = {
  params: { lang: Locale}
}

export default async function TreasuryPage({ params: { lang } }: PageProps) {
  const t = await getDictionary(lang)
  return <div>{t("Treasury")}</div>;
}
