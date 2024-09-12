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
  console.debug("DhoLayout", {dao, connectedDaos})
  return (
    <div className="flex flex-grow h-full w-full">
      <MenuLeft activeDao={dao} connectedDaos={connectedDaos} />
      <MenuTop />
      <div className="flex-grow ml-20 mt-20 p-10">{children}</div>
    </div>
  );
}
