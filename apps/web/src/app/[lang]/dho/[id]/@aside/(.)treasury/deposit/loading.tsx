import { DepositFunds } from '@hypha-platform/epics';
import { SidePanel } from '../../_components/side-panel';

export default async function Treasury({}) {
  return (
    <SidePanel>
      <DepositFunds closeUrl={''} spaceId={0} />
    </SidePanel>
  );
}
