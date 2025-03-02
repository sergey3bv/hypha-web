import { createRequestScope } from '../../container';
import { SpaceConfigService } from './service';

type CreateSpaceConfigServiceProps = {
  authToken: string;
};

export const createSpaceConfigService = ({
  authToken,
}: CreateSpaceConfigServiceProps) => {
  const requestContainer = createRequestScope({ authToken });
  return requestContainer.get(SpaceConfigService);
};
