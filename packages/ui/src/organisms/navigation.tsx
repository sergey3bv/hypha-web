
export const NavigationItem: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => <li>{children}</li>;

export type NavigationProps = {
  children: React.ReactNode;
}

export const Navigation: React.FC<NavigationProps> = ({children}) => {
  return (
    <nav className="h-full px-6 py-4 bg-white w-52">
    {children}
    </nav>
  );
};
