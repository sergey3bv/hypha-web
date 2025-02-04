import { Locale } from '@hypha-platform/i18n';
import { Tabs, TabsList, TabsTrigger } from '@hypha-platform/ui/server';
import Link from 'next/link';
import { getDhoPathAgreements } from '../agreements/constants';
import { getDhoPathMembership } from '../membership/constants';
import { getDhoPathTreasury } from '../treasury/constants';

export function NavigationTabs({
  lang,
  id,
  activeTab,
}: {
  lang: Locale;
  id: string;
  activeTab: string;
}) {
  return (
    <Tabs value={activeTab} className="w-full mt-16">
      <TabsList className="w-full mb-7">
        <TabsTrigger
          asChild
          value="agreements"
          className="w-full"
          variant="ghost"
        >
          <Link
            href={getDhoPathAgreements(lang, id)}
            className="w-full"
            passHref
          >
            Agreements
          </Link>
        </TabsTrigger>
        <TabsTrigger
          asChild
          value="membership"
          className="w-full"
          variant="ghost"
        >
          <Link
            href={getDhoPathMembership(lang as Locale, id as string)}
            className="w-full"
            passHref
          >
            Membership
          </Link>
        </TabsTrigger>
        <TabsTrigger
          asChild
          value="treasury"
          className="w-full"
          variant="ghost"
        >
          <Link
            href={getDhoPathTreasury(lang as Locale, id as string)}
            className="w-full"
            passHref
          >
            Treasury
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
