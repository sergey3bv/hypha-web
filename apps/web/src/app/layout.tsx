import { ReactNode } from 'react';

export const metadata = {
  title: 'Hypha',
  description: 'Hypha Web Application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
