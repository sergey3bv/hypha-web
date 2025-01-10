import { DiscussionDetail } from '@hypha-platform/epics';
import { SidePanel } from '../../../_components/side-panel';

export default function Loading() {
  return (
    <SidePanel>
      <DiscussionDetail
        isLoading
        creator={{}}
        title={''}
        content={''}
        image={''}
        messages={[]}
        closeUrl={''}
      />
    </SidePanel>
  );
}
