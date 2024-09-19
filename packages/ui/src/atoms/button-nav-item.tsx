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
    <Button key={href} variant={isActive ? 'default' : 'ghost'} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
