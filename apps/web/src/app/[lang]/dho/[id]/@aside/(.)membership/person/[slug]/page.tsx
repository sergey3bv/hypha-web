'use client';
// TODO: refactor
import { useSpaces } from 'packages/epics/src/membership/hooks/use-spaces';

import { useParams } from 'next/navigation';

import { MemberDetail } from '@hypha-platform/epics';
import { Locale } from '@hypha-platform/i18n';

import { useMemberBySlug } from '@web/hooks/use-member-by-slug';
import { SidePanel } from '@web/app/[lang]/@aside/_components/side-panel';
import { getDhoPathAgreements } from '@web/app/[lang]/dho/[id]/agreements/constants';
import { getDhoPathMembership } from '@web/app/[lang]/dho/[id]/membership/constants';

export default function Member() {
  const { slug, id, lang } = useParams();
  const { person, isLoading } = useMemberBySlug(slug as string);
  const { spaces } = useSpaces({
    page: 1,
    sort: { sort: 'all' },
  });

  return (
    <SidePanel>
      <MemberDetail
        closeUrl={getDhoPathMembership(lang as Locale, id as string)}
        member={{
          avatarUrl: person?.avatarUrl,
          name: person?.name,
          surname: person?.surname,
          nickname: person?.nickname,
          commitment: 50, // TODO: get commitment
          status: 'active', // TODO: get status
          about: person?.description,
        }}
        isLoading={isLoading}
        basePath={getDhoPathAgreements(lang as Locale, id as string)}
        spaces={spaces}
      />
    </SidePanel>
  );
}
