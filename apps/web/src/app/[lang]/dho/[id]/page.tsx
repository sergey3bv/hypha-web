import { getDictionary } from "@hypha-platform/i18n";
import { PageProps } from "../../../types";

export default async function Index({ params: { lang } }: PageProps) {
  const t = await getDictionary(lang)
  return (
    <div>{t("DHO Dashboard")}</div>
  );
}
