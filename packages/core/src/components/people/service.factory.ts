import { PeopleService } from './service';
import { createRequestScope } from '../../container';

type CreatePeopleServiceProps = {
  authToken: string;
};

export const createPeopleService = ({
  authToken,
}: CreatePeopleServiceProps) => {
  const requestContainer = createRequestScope({ authToken });
  return requestContainer.get(PeopleService);
};
