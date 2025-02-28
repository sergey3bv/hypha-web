import { defaultConfig } from '../../config/defaults';
import { PeopleService } from './service';
import { getContainer, createRequestScope } from '../../container';

type CreatePeopleServiceProps = {
  config?: typeof defaultConfig;
  authToken?: string;
};

export const createPeopleService = ({
  config = defaultConfig,
  authToken,
}: CreatePeopleServiceProps = {}) => {
  // If we have an auth token, create a request-scoped container
  if (authToken) {
    // Create a request-scoped container with the auth token
    const requestContainer = createRequestScope({ authToken });

    // Get the service from the request-scoped container
    return requestContainer.get(PeopleService);
  }

  // No auth token, use the global container
  const container = getContainer();
  return container.get(PeopleService);
};
