import { defaultConfig } from '../../config/defaults';
import { getContainer, createRequestScope } from '../../container';
import { SpaceService } from './service';

type CreateSpaceServiceProps = {
  config?: typeof defaultConfig;
  authToken?: string;
};

export const createSpaceService = ({
  config = defaultConfig,
  authToken,
}: CreateSpaceServiceProps = {}) => {
  // If we have an auth token, create a request-scoped container
  if (authToken) {
    // Create a request-scoped container with the auth token
    const requestContainer = createRequestScope({ authToken });

    // Get the service from the request-scoped container
    return requestContainer.get(SpaceService);
  }

  // No auth token, use the global container
  const container = getContainer();
  return container.get(SpaceService);
};
