import { MemberDetail } from '@hypha-platform/epics';
import { SidePanel } from '@web/app/[lang]/@aside/_components/side-panel';

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
