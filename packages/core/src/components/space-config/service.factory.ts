import { defaultConfig } from '../../config/defaults';
import { getContainer, createRequestScope } from '../../container';
import { SpaceConfigService } from './service';

type CreateSpaceConfigServiceProps = {
  config?: typeof defaultConfig;
  authToken?: string;
};

export const createSpaceConfigService = ({
  config = defaultConfig,
  authToken,
}: CreateSpaceConfigServiceProps = {}) => {
  // If we have an auth token, create a request-scoped container
  if (authToken) {
    // Create a request-scoped container with the auth token
    const requestContainer = createRequestScope({ authToken });

    // Get the service from the request-scoped container
    return requestContainer.get(SpaceConfigService);
  }

  // No auth token, use the global container
  const container = getContainer();
  return container.get(SpaceConfigService);
};
