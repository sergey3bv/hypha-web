'use client';

import Link from 'next/link';
import { Button } from './button';
import { usePathname } from 'next/navigation';

type ButtonNavItemProps = {
  href: string;
  label: string;
};

export const ButtonNavItem = ({ href, label }: ButtonNavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.includes(href);
  return (
    <Link href={href} key={href}>
      <Button variant={isActive ? 'default' : 'ghost'}>{label}</Button>
    </Link>
  );
};
