export const Html: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <html lang="en" suppressHydrationWarning className={className}>
      <body className="flex flex-col w-full h-full">{children}</body>
    </html>
  );
};
