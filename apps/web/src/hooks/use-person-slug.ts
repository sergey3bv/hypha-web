import { useParams } from 'next/navigation';

export const usePersonSlug = () => {
  const params = useParams();
  console.debug('params', params);
  return params.personSlug as string;
};
