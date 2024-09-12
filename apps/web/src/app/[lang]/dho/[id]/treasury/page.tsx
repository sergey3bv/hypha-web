import {  Locale } from "@hypha-platform/i18n";
import { TreasuryGraph } from "@hypha-platform/ui/server";

type PageProps = {
  params: { lang: Locale}
}

export default async function TreasuryPage({ params: { lang } }: PageProps) {
  return <TreasuryGraph />;
}
