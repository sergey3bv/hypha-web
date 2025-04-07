import { ButtonClose } from '@hypha-platform/epics';
import { SelectCreateAction } from '../../_components/select-create-action';
import { SidePanel } from '../_components/side-panel';

export default function SelectCreateActions() {
  return (
    <SidePanel>
      <ButtonClose />
      <SelectCreateAction />
    </SidePanel>
  );
}
