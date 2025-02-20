import { CreateSpaceForm } from '@hypha-platform/epics';
import { SidePanel } from '../../_components/side-panel';

export default function Loading() {
  return (
    <SidePanel>
      <CreateSpaceForm
        isLoading={true}
        creator={{
          avatar: '',
          name: '',
          surname: '',
        }}
        closeUrl={''}
      />
    </SidePanel>
  );
}
