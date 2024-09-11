import Link from 'next/link';
import { Logo, } from '../atoms';

type MenuProps = {
  home?: string;
};

export const Menu: React.FC<MenuProps> = ({ home = '/' }) => {
  return (
    <nav className="sticky top-0 z-10 flex items-center w-full h-16 px-6 shadow-sm backdrop-blur-md bg-white/5">
      <Link href={home} className="text-xl text-gray-600">
        <Logo />
      </Link>
    </nav>
  );
};
