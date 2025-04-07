import { Locale } from '@hypha-platform/i18n';
import {
  InnerSpacesSection,
  MembersSection,
} from '@hypha-platform/epics';

import { useMembers } from '@web/hooks/use-members';

import { NavigationTabs } from '../_components/navigation-tabs';
import { getDhoPathMembership } from './constants';

type PageProps = {
  params: Promise<{ lang: Locale; id: string }>;
};

export default async function MembershipPage(props: PageProps) {
  const params = await props.params;

  const { lang, id } = params;

  const basePath = getDhoPathMembership(lang as Locale, id as string);

  return (
    <div className="flex flex-col gap-6 py-4">
      <NavigationTabs lang={lang} id={id} activeTab="membership" />
      <InnerSpacesSection basePath={`${basePath}/space`} />
      <MembersSection basePath={`${basePath}/person`} useMembers={useMembers} />
    </div>
  );
}
