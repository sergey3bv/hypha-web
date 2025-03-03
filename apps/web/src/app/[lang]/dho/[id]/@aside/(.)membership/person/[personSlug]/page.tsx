'use client';

import { useParams } from 'next/navigation';

import { MemberDetail } from '@hypha-platform/epics';
import { Locale } from '@hypha-platform/i18n';

import { useMemberBySlug } from '@web/hooks/use-member-by-slug';
import { SidePanel } from '@web/app/[lang]/@aside/_components/side-panel';
import { getDhoPathAgreements } from '@web/app/[lang]/dho/[id]/agreements/constants';
import { getDhoPathMembership } from '@web/app/[lang]/dho/[id]/membership/constants';
import { useSpaceDocuments } from '@web/hooks/use-space-documents';
import { usePersonSlug } from '@web/hooks/use-person-slug';
import { useSpacesByMemberSlug } from '@web/hooks/use-spaces-by-member-slug';

export default function Member() {
  const { id, lang } = useParams();
  const personSlug = usePersonSlug();
  const { person, isLoading } = useMemberBySlug(personSlug);
  const { spaces } = useSpacesByMemberSlug(personSlug);

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
        useDocuments={useSpaceDocuments}
      />
    </SidePanel>
  );
}
