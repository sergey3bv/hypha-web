import { getDictionary, Locale } from "@hypha-platform/i18n";

type PageProps = {
  params: { lang: Locale}
}

export default async function MembersPage({ params: { lang } }: PageProps) {
  const t = await getDictionary(lang)
  return <div>{t("Members")}</div>;
}
