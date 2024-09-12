import { Text } from '@radix-ui/themes';
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
};

export const MenuTop = ({ activeDao: { title }, navItems }: MenuTopProps) => {
  return (
    <div className="fixed top-0 left-20 right-0 flex h-20 items-center px-10 bg-background/5">
      <div id="menu-top-active-dao">
        <h1 className="text-2xl">
          {title}
        </h1>
      </div>
      <div
        id="menu-top-actions"
        className="flex gap-2 flex-grow justify-center"
      >
        {navItems.map((item) => (
          <ButtonNavItem key={item.href} href={item.href} label={item.label} />
        ))}
      </div>
      <div id="menu-top-create-action">
        <Button>Create</Button>
      </div>
    </div>
  );
};
