import { useParams } from 'next/navigation';

export const useSpaceSlug = () => {
  const params = useParams();
  console.debug('params', params);
  return params.id as string;
};
