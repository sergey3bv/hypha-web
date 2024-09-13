import { getAccessToken, getDaoDetail, getUserDaos } from '@hypha-platform/graphql/rsc';
import { Locale } from '@hypha-platform/i18n';
import { MenuLeft, MenuTop } from '@hypha-platform/ui/server';

export default async function DhoLayout({
  children,
  params: { id: daoSlug, lang },
}: {
  children: React.ReactNode;
  params: { id: string; lang: Locale };
}) {
  const newtoken = await getAccessToken();
  const dao = await getDaoDetail({ token: newtoken.accessJWT, daoSlug });
  const connectedDaos = await getUserDaos({ token: newtoken.accessJWT });

  return (
    <div className="flex flex-grow w-full h-full">
      <MenuLeft activeDao={dao} connectedDaos={connectedDaos} />
      <MenuTop
        createActionHref={'/[lang]/dho/[id]/assignments/create'
          .replace('[lang]', lang)
          .replace('[id]', daoSlug)}
        activeDao={dao}
        navItems={[
          {
            label: 'Agreements',
            href: `/${lang}/dho/${daoSlug}/assignments`,
          },
          {
            label: 'Members',
            href: `/${lang}/dho/${daoSlug}/members`,
          },
          {
            label: 'Treasury',
            href: `/${lang}/dho/${daoSlug}/treasury`,
          },
        ]}
      />
      <div className="fixed bottom-0 right-0 flex-grow p-10 overflow-y-auto top-20 left-20 bg-background/5">
        {children}
      </div>
    </div>
  );
}
