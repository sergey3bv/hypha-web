import { DepositFunds } from '@hypha-platform/epics';
import { getDhoPathTreasury } from '../constants';
import { Locale } from '@hypha-platform/i18n';
import { createSpaceService } from '@hypha-platform/core/server';

type PageProps = {
  params: { lang: Locale; id: string };
};

export default async function Treasury({ params }: PageProps) {
  const { lang, id } = params;

  const spaceService = createSpaceService();

  const spaceFromDb = await spaceService.getBySlug({ slug: id });

  const spaceId = spaceFromDb.web3SpaceId;

  return (
    <DepositFunds closeUrl={getDhoPathTreasury(lang, id)} spaceId={spaceId} />
  );
}
