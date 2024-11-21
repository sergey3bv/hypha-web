import { Locale } from '@hypha-platform/i18n';

export default async function DhoLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { id: string; lang: Locale };
}) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
