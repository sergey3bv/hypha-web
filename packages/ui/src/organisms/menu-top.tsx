import Link from 'next/link';
import { Button } from '../atoms';
import { ButtonNavItem } from '../atoms/button-nav-item';

type Dao = {
  title: string;
  id: string;
};

type MenuTopNavItem = {
  label: string;
  href: string;
};

type MenuTopProps = {
  activeDao: Dao;
  navItems: MenuTopNavItem[];
  createActionHref: string;
};

export const MenuTop = ({
  activeDao: { title },
  navItems,
  createActionHref,
}: MenuTopProps) => {
  console.debug('MenuTopProps', { createActionHref });
  return (
    <div className="fixed top-0 right-0 flex items-center h-20 px-10 left-20 bg-background/5">
      <div id="menu-top-active-dao">
        <h1 className="text-2xl">{title}</h1>
      </div>
      <div
        id="menu-top-actions"
        className="flex justify-center flex-grow gap-2"
      >
        {navItems.map((item) => (
          <ButtonNavItem key={item.href} href={item.href} label={item.label} />
        ))}
      </div>
      <div id="menu-top-create-action">
        <Button asChild>
          <Link href={createActionHref}>Create</Link>
        </Button>
      </div>
    </div>
  );
};
