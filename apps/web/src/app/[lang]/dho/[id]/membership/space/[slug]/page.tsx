'use client';

import { useParams } from 'next/navigation';

import { SubspaceDetail, useSubspaceBySlug } from '@hypha-platform/epics';
import { Locale } from '@hypha-platform/i18n';

import { useMembers } from '@web/hooks/use-members';
import { getDhoPathMembership } from '../../constants';

type PageProps = {
  params: Promise<{ slug: string; id: string; lang: string }>;
};

export default function Subspace(props: PageProps) {
  const { slug, id, lang } = useParams();

  const { data } = useSubspaceBySlug(slug as string);

  return (
    <SubspaceDetail
      closeUrl={getDhoPathMembership(lang as Locale, id as string)}
      title={data?.title}
      image={data?.image}
      content={data?.description}
      useMembers={useMembers}
      memberBasePath={''}
    />
  );
}
