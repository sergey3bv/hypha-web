import { Locale, i18nConfig } from '@hypha-platform/i18n';
import {
  HomeIcon,
  Logo,
  Navigation,
  NavigationItem,
  PeopleIcon,
  VoteIcon,
} from '@hypha-platform/ui/server';
import Link from 'next/link';
import { SelectLanguage } from '@hypha-platform/i18n/client';

export default function DhoLayout({
  children,
  params: { id: dho, lang },
}: {
  children: React.ReactNode;
  params: { id: string; lang: Locale };
}) {
  return (
    <div className="flex h-full">
      <Navigation>
        <div className="flex flex-col gap-2">
          <div className="text-[0.5rem] uppercase font-bold text-slate-500">
            General
          </div>
          <ul className="flex flex-col gap-2">
            <NavigationItem>
              <Link href={`/${lang}/dho/${dho}/`} className="flex gap-2">
                <HomeIcon />
                <div>Dashboard</div>
              </Link>
            </NavigationItem>
            <NavigationItem>
              <Link href={`/${lang}/dho/${dho}/members`} className="flex gap-2">
                <PeopleIcon />
                <div>Members</div>
              </Link>
            </NavigationItem>
            <NavigationItem>
              <Link
                href={`/${lang}/dho/${dho}/assignments`}
                className="flex gap-2"
              >
                <VoteIcon />
                <div>Assignments</div>
              </Link>
            </NavigationItem>
            <NavigationItem>
              <Link
                href={`/${lang}/dho/${dho}/treasury`}
                className="flex gap-2"
              >
                <HomeIcon />
                <div>Treasury</div>
              </Link>
            </NavigationItem>
          </ul>
        </div>
        <div>
          <SelectLanguage
            currentLanguage={lang}
            languages={i18nConfig.locales}
          />
        </div>
      </Navigation>
      <article className="py-4">{children}</article>
    </div>
  );
}
