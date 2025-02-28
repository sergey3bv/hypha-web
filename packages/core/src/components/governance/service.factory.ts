import { defaultConfig } from '../../config/defaults';
import { getContainer, createRequestScope } from '../../container';
import { DocumentService } from './service';

type CreateDocumentServiceProps = {
  config?: typeof defaultConfig;
  authToken?: string;
};

export const createDocumentService = ({
  config = defaultConfig,
  authToken,
}: CreateDocumentServiceProps = {}) => {
  // If we have an auth token, create a request-scoped container
  if (authToken) {
    // Create a request-scoped container with the auth token
    const requestContainer = createRequestScope({ authToken });

    // Get the service from the request-scoped container
    return requestContainer.get(DocumentService);
  }

  // No auth token, use the global container
  const container = getContainer();
  return container.get(DocumentService);
};
