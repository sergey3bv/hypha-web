import { ReactNode } from 'react';

export const metadata = {
  title: 'Hypha',
  description: 'Hypha Web Application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://hypha.earth/wp-content/uploads/2023/07/cropped-favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="https://hypha.earth/wp-content/uploads/2023/07/cropped-favicon-192x192.png"
          sizes="192x192"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
