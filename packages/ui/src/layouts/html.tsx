import clsx from 'clsx';

export const Html: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={clsx(
        className,
        'fixed top-0 left-0 right-0 bottom-0',
      )}
    >
      <body className="flex w-full h-full">{children}</body>
    </html>
  );
};
