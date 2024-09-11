import { Locale, i18nConfig } from '@hypha-platform/i18n';
import {
  Navigation,
  NavigationItem,
} from '@hypha-platform/ui/server';
import Link from 'next/link';
import { SelectLanguage } from '@hypha-platform/i18n/client';
import { FaHome, FaVoteYea } from 'react-icons/fa';
import { FaMoneyBill, FaPeopleGroup } from 'react-icons/fa6';

export default function DhoLayout({
  children,
  params: { id: dho, lang },
}: {
  children: React.ReactNode;
  params: { id: string; lang: Locale };
}) {
  return (
    <div className="flex flex-grow h-full">
      <Navigation>
        <div className="flex flex-col gap-2">
          <div className="text-[0.5rem] uppercase font-bold text-slate-500">
            General
          </div>
          <ul className="flex flex-col gap-2">
            <NavigationItem>
              <Link
                href={`/${lang}/dho/${dho}/`}
                className="flex items-center gap-2"
              >
                <FaHome />
                <div>Dashboard</div>
              </Link>
            </NavigationItem>
            <NavigationItem>
              <Link
                href={`/${lang}/dho/${dho}/members`}
                className="flex items-center gap-2"
              >
                <FaPeopleGroup />
                <div>Members</div>
              </Link>
            </NavigationItem>
            <NavigationItem>
              <Link
                href={`/${lang}/dho/${dho}/assignments`}
                className="flex items-center gap-2"
              >
                <FaVoteYea />
                <div>Assignments</div>
              </Link>
            </NavigationItem>
            <NavigationItem>
              <Link
                href={`/${lang}/dho/${dho}/treasury`}
                className="flex items-center gap-2"
              >
                <FaMoneyBill />
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
      <article className="w-full h-full py-4">{children}</article>
    </div>
  );
}
