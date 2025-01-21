'use client';

import { useAuthentication } from '@hypha-platform/authentication';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@hypha-platform/ui';
import { PersonAvatar } from './person-avatar';
import { useProfile } from '../hooks/use-profile';
import { EthAddress } from './eth-address';

export type ButtonProfileProps = {
  avatarSrc?: string;
  userName?: string;
  address?: string;
  isConnected: boolean;
  login: () => void;
  logout: () => void;
};

export const ButtonProfile = ({
  avatarSrc,
  userName,
  isConnected,
  address,
  login,
  logout,
}: ButtonProfileProps) => {
  return (
    <div>
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <PersonAvatar avatarSrc={avatarSrc} userName={userName} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <EthAddress address={address} />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={login}>Sign in</Button>
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
  const { isAuthenticated, login, logout, user } = useAuthentication();
  const { profile } = useProfile({ address: user?.address });

  return (
    <ButtonProfile
      avatarSrc={profile?.avatar}
      userName={profile?.name}
      address={user?.address}
      isConnected={isAuthenticated}
      login={login}
      logout={logout}
    />
  );
};
