import {
  HomeIcon,
  Logo,
  Navigation,
  NavigationItem,
  PeopleIcon,
  VoteIcon,
} from '@hypha-platform/ui/server';
import Link from 'next/link';

export default function DhoLayout({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode;
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.debug({ params, searchParams });
  const dho = params.id;
  return (
    <div className="flex">
      <Navigation>
        <Logo />
        <div className="flex flex-col gap-2 py-8">
          <div className="text-[0.5rem] uppercase font-bold text-slate-500">
            General
          </div>
          <ul className='flex flex-col gap-2'>
            <NavigationItem>
              <Link href={`/dho/${dho}/`} className="flex gap-2">
                <HomeIcon />
                <div>Dashboard</div>
              </Link>
            </NavigationItem>
            <NavigationItem>
              <Link href={`/dho/${dho}/members`} className="flex gap-2">
                <PeopleIcon />
                <div>Members</div>
              </Link>
            </NavigationItem>
            <NavigationItem>
              <Link href={`/dho/${dho}/assignments`} className="flex gap-2">
                <VoteIcon />
                <div>Assignments</div>
              </Link>
            </NavigationItem>
            <NavigationItem>
              <Link href={`/dho/${dho}/treasury`} className="flex gap-2">
                <HomeIcon />
                <div>Treasury</div>
              </Link>
            </NavigationItem>
          </ul>
        </div>
      </Navigation>
      <article>{children}</article>
    </div>
  );
}
