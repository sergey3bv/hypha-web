'use client';
import { DepositFunds } from '@hypha-platform/epics';
import { SidePanel } from '../../_components/side-panel';

export default function Treasury() {
  return (
    <SidePanel>
      <DepositFunds closeUrl={''} address={''} />
    </SidePanel>
  );
}
