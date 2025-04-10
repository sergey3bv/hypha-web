import { DepositFunds } from '@hypha-platform/epics';
import { getDhoPathTreasury } from '../../../treasury/constants';
import { Locale } from '@hypha-platform/i18n';
import { useSpaceDetailsWeb3Rpc } from '@core/space';
import { createSpaceService } from '@hypha-platform/core/server';
import { SidePanel } from '../../_components/side-panel';

type PageProps = {
  params: Promise<{ lang: Locale; id: string }>;
};

export default async function Treasury(props: PageProps) {
  const { lang, id } = await props.params;

  const spaceService = createSpaceService();

  const spaceFromDb = await spaceService.getBySlug({ slug: id });

  const spaceId = spaceFromDb.web3SpaceId;

  return (
    <SidePanel>
      <DepositFunds
        closeUrl={getDhoPathTreasury(lang as Locale, id as string)}
        spaceId={spaceId as number}
        useSpaceAddress={useSpaceDetailsWeb3Rpc}
      />
    </SidePanel>
  );
}
