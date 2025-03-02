import { createRequestScope } from '../../container';
import { DocumentService } from './service';

type CreateDocumentServiceProps = {
  authToken?: string;
};

export const createDocumentService = ({
  authToken,
}: CreateDocumentServiceProps) => {
  const requestContainer = createRequestScope({ authToken });
  return requestContainer.get(DocumentService);
};
