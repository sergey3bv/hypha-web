import { useParams } from 'next/navigation';

export const useDocumentSlug = () => {
  const params = useParams();
  console.debug('params', params);
  return params.documentSlug as string;
};
