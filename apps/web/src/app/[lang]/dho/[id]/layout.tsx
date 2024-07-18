import { Locale } from '@hypha-platform/i18n';
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
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex">
      <Navigation>
        <Logo />
        <div className="flex flex-col gap-2 py-8">
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
          <SelectLanguage lang={lang} />
        </div>
      </Navigation>
      <article>{children}</article>
    </div>
  );
}
