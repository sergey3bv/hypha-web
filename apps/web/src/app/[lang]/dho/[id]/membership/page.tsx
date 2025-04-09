import { Locale } from '@hypha-platform/i18n';
import { MembersSection, SubspaceSection } from '@hypha-platform/epics';

import { useMembers } from '@web/hooks/use-members';

import { NavigationTabs } from '../_components/navigation-tabs';
import { getDhoPathMembership } from './constants';
import { createSpaceService } from '@core/space/server';
import { getDhoPathAgreements } from '../agreements/constants';

type PageProps = {
  params: Promise<{ lang: Locale; id: string }>;
};

export default async function MembershipPage(props: PageProps) {
  const params = await props.params;

  const { lang, id } = params;

  const basePath = getDhoPathMembership(lang as Locale, id as string);

  const spaces = await createSpaceService().getAll();

  return (
    <div className="flex flex-col gap-6 py-4">
      <NavigationTabs lang={lang} id={id} activeTab="membership" />
      <SubspaceSection
        spaces={spaces}
        lang={lang}
        getDhoPathAgreements={getDhoPathAgreements}
      />
      <MembersSection basePath={`${basePath}/person`} useMembers={useMembers} />
    </div>
  );
}
