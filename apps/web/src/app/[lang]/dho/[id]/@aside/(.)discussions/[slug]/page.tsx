import { DiscussionDetail } from '@hypha-platform/epics';
import {
  getCommentsByDiscussionSlug,
  getDiscussionBySlug,
} from '@hypha-platform/graphql/rsc';
import { SidePanel } from '../../_components/side-panel';

type PageProps = {
  params: Promise<{ slug: string; id: string; lang: string }>;
};

export default async function Subspace(props: PageProps) {
  const params = await props.params;
  const { slug, id, lang } = params;
  const data = await getCommentsByDiscussionSlug({ slug });
  const discussion = await getDiscussionBySlug(slug);

  return (
    <SidePanel>
      <DiscussionDetail
        creator={discussion?.creator}
        title={discussion?.title}
        isLoading={false}
        content={discussion?.content ?? ''}
        image={discussion?.image ?? ''}
        messages={data}
        closeUrl={`/${lang}/dho/${id}/agreements`}
      />
    </SidePanel>
  );
}
