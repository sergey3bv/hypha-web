import { SidePanel } from '../../../_components/side-panel';
import { SubspaceDetail } from '@hypha-platform/epics';

export default function Loading() {
  return (
    <SidePanel>
      <SubspaceDetail
        title={''}
        image={''}
        content={''}
        members={[]}
        closeUrl={''}
      />
    </SidePanel>
  );
}
