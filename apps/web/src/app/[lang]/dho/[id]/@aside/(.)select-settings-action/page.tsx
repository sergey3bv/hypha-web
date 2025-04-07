import { ButtonClose } from '@hypha-platform/epics';
import { SidePanel } from '../_components/side-panel';
import { SelectSettingsAction } from '../../_components/select-settings-action';

export default function SelectCreateActions() {
  return (
    <SidePanel>
      <ButtonClose />
      <SelectSettingsAction />
    </SidePanel>
  );
}
