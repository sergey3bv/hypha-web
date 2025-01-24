import { CreateForm } from '@hypha-platform/epics';
import { SidePanel } from '../../_components/side-panel';

export default function Loading() {
  return (
    <SidePanel>
      <CreateForm
        isLoading={true}
        creator={{
          avatar: '',
          name: '',
          surname: '',
        }}
        closeUrl={''}
        type="Space"
      />
    </SidePanel>
  );
}
