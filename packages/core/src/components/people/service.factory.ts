import { defaultConfig } from '../../config/defaults';
import { getContainer } from '../../container';
import { PeopleService } from './service';

type CreatePeopleServiceProps = {
  config?: typeof defaultConfig;
};

export const createPeopleService = ({
  config = defaultConfig,
}: CreatePeopleServiceProps = {}) => {
  const container = getContainer(config);
  const peopleService = new PeopleService(container);
  return peopleService;
};
