import { defaultConfig } from '../../config/defaults';
import { getContainer } from '../../container';
import { SpaceService } from './service';

type CreateSpaceServiceProps = {
  config?: typeof defaultConfig;
};

export const createSpaceService = ({
  config = defaultConfig,
}: CreateSpaceServiceProps = {}) => {
  const container = getContainer(config);
  const peopleService = new SpaceService(container);
  return peopleService;
};
