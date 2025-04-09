'use client';
import { DepositFunds } from '@hypha-platform/epics';
import { getDhoPathTreasury } from '../constants';
import { useParams } from 'next/navigation';
import { Locale } from '@hypha-platform/i18n';
import { useAuthentication } from '@hypha-platform/authentication';

export default function Treasury() {
  const { lang, id } = useParams();
  const { user } = useAuthentication();
  return (
    <DepositFunds
      closeUrl={getDhoPathTreasury(lang as Locale, id as string)}
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      address={user?.wallet?.address || ''}
    />
  );
}
