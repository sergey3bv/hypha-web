import { createRequestScope } from '../../container';
import { SpaceService } from './service';

type CreateSpaceServiceProps = {
  authToken?: string;
};

export const createSpaceService = ({
  authToken,
}: CreateSpaceServiceProps = {}) => {
  const requestContainer = createRequestScope({ authToken });
  return requestContainer.get(SpaceService);
};
