'use client';

import { ButtonProfile } from './button-profile';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { UseAuthentication } from 'packages/authentication/src/shared/types';
import { UseMe } from '../hooks/types';

type ConnectedButtonProfileProps = {
  useAuthentication: UseAuthentication;
  useMe: UseMe;
  newUserRedirectPath: string;
};

export const ConnectedButtonProfile = ({
  useAuthentication,
  useMe,
  newUserRedirectPath,
}: ConnectedButtonProfileProps) => {
  const { isAuthenticated, login, logout, user } = useAuthentication();
  const { person } = useMe({ newUserRedirectPath });

  const router = useRouter();
  const { lang } = useParams();

  return (
    <ButtonProfile
      avatarSrc={person?.avatarUrl ?? ''}
      userName={person?.name ?? ''}
      address={user?.wallet?.address}
      isConnected={isAuthenticated}
      onLogin={login}
      onLogout={logout}
      onProfile={() => {
        router.push(`/${lang}/profile/`);
      }}
    />
  );
};
