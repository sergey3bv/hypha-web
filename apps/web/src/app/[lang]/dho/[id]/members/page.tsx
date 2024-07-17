import { getDictionary } from "@hypha-platform/i18n";
import { PageProps } from "../../../../types";

export default async function MembersPage({ params: { lang } }: PageProps) {
  const t = await getDictionary(lang)
  return <div>{t("Members Page")}</div>;
}
