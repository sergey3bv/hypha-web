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
      address={user?.wallet?.address || ''}
    />
  );
}
