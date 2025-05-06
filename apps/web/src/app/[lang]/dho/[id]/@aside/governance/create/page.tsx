import { CreateAgreementForm, SidePanel } from '@hypha-platform/epics';
import { Locale } from '@hypha-platform/i18n';
import { createSpaceService } from '@core/space/server';
import { getDhoPathGovernance } from '../../../@tab/governance/constants';

type PageProps = {
  params: Promise<{ lang: Locale; id: string }>;
};

export default async function CreateAgreementPage({ params }: PageProps) {
  const { lang, id } = await params;

  const spaceService = createSpaceService();

  const spaceFromDb = await spaceService.getBySlug({ slug: id });

  const spaceId = spaceFromDb.id;
  const web3SpaceId = spaceFromDb.web3SpaceId;

  return (
    <SidePanel>
      <CreateAgreementForm
        successfulUrl={getDhoPathGovernance(lang as Locale, id)}
        spaceId={spaceId}
        web3SpaceId={web3SpaceId}
      />
    </SidePanel>
  );
}
