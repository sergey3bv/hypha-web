import { SidePanel } from '../../../_components/side-panel';
import { MemberDetail } from '@hypha-platform/epics';

export default function Loading() {
  return (
    <SidePanel>
      <MemberDetail
        closeUrl=""
        member={{}}
        isLoading={true}
        basePath=""
        spaces={[]}
      />
    </SidePanel>
  );
}
