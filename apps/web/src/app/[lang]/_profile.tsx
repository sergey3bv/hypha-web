'use client';

import { useMe } from '@hypha-platform/core/client';

export const Profile = () => {
  const { person } = useMe();

  return <pre>{JSON.stringify(person, null, 2)}</pre>;
};
