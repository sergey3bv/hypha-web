type SidePanelProps = {
  children: React.ReactNode;
};

export const SidePanel = ({ children }: SidePanelProps) => {
  return (
    <div className="sticky p-9 top-9 h-[calc(100vh-72px)] bg-neutral-2 w-container-md overflow-y-auto">
      {children}
    </div>
  );
};
