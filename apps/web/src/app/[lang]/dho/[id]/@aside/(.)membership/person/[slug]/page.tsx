'use client';

import { MemberDetail, useMemberBySlug } from '@hypha-platform/epics';
import { useParams } from 'next/navigation';
import { SidePanel } from '../../../_components/side-panel';
import { useSpaces } from 'packages/epics/src/membership/hooks/use-spaces';
import { Locale } from '@hypha-platform/i18n';
import { getDhoPathAgreements } from '../../../../agreements/constants';
import { getDhoPathMembership } from '../../../../membership/constants';

export default function Member() {
  const { slug, id, lang } = useParams();
  const { data, isLoading } = useMemberBySlug(slug as string);
  const { spaces } = useSpaces({
    page: 1,
    sort: { sort: 'all' },
  });

  return (
    <SidePanel>
      <MemberDetail
        closeUrl={getDhoPathMembership(lang as Locale, id as string)}
        member={{
          avatarUrl: data?.avatarUrl,
          name: data?.name,
          surname: data?.surname,
          nickname: data?.nickname,
          commitment: 50, // TODO: get commitment
          status: 'active', // TODO: get status
          about: data?.description,
        }}
        isLoading={isLoading}
        basePath={getDhoPathAgreements(lang as Locale, id as string)}
        spaces={spaces}
      />
    </SidePanel>
  );
}
