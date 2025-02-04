import { Locale } from '@hypha-platform/i18n';

export const getDhoPathWallet = (lang: Locale, id: string) => {
  return `/${lang}/dho/${id}/wallet`;
};
