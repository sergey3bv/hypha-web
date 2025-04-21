import { ButtonClose, SidePanel } from '@hypha-platform/epics';
import { SelectSettingsAction } from '../../../_components/select-settings-action';

export default function SelectSettingsActions() {
  return (
    <SidePanel>
      <ButtonClose dropSegment="select-settings-action" />
      <SelectSettingsAction />
    </SidePanel>
  );
}
