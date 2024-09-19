import { ButtonProfile, ButtonProfileProps } from './button-profile';
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
  activeDao?: Dao;
  navItems: MenuTopNavItem[];
  createActionHref: string;
  activeUser: ButtonProfileProps;
};

export const MenuTop = ({
  activeDao,
  navItems,
  createActionHref,
  activeUser,
}: MenuTopProps) => {
  console.debug('MenuTopProps', { createActionHref });
  return (
    <div className="fixed top-0 right-0 left-0 flex items-center space-x-10 h-20 px-10 bg-background/5">
      <div id="menu-top-active-dao" className="flex-grow">
        {activeDao && <h1 className="text-2xl">{activeDao.title}</h1>}
      </div>
      <div
        id="menu-top-actions"
        className="flex justify-center gap-2"
      >
        {navItems.map((item) => (
          <ButtonNavItem key={item.href} href={item.href} label={item.label} />
        ))}
      </div>
      <div id="menu-top-profile">
        <ButtonProfile
          avatarSrc={activeUser.avatarSrc}
          userName={activeUser.userName}
        />
      </div>
    </div>
  );
};
