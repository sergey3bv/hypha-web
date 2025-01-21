'use client';

import { useAuthentication } from '@hypha-platform/authentication';
import { Avatar, AvatarImage, Button } from '@hypha-platform/ui';

export type ButtonProfileProps = {
  avatarSrc: string;
  userName?: string;
  isConnected: boolean;
  login: () => void;
};

export const ButtonProfile = ({
  avatarSrc,
  userName,
  isConnected,
  login,
}: ButtonProfileProps) => {
  return (
    <div>
      {isConnected ? (
        <Avatar className="w-7 h-7 rounded-lg">
          <AvatarImage src={avatarSrc} alt={`${userName}'s avatar`} />
        </Avatar>
      ) : (
        <Button onClick={login}>Connect</Button>
      )}
    </div>
  );
};

export type ConnectedButtonProfileProps = Omit<
  ButtonProfileProps,
  'login' | 'isConnected'
>;

export const ConnectedButtonProfile = ({
  avatarSrc,
  userName,
}: ConnectedButtonProfileProps) => {
  const { isAuthenticated, login } = useAuthentication();

  console.log('ButtonProfile', { isAuthenticated });
  return (
    <ButtonProfile
      avatarSrc={avatarSrc}
      userName={userName}
      isConnected={isAuthenticated}
      login={login}
    />
  );
};
