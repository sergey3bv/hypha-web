import {
  getAccessToken,
  getDaoDetail,
} from '@hypha-platform/graphql/rsc';
import { ButtonProfile } from '@hypha-platform/epics';
import { Locale } from '@hypha-platform/i18n';
import {  MenuTop } from '@hypha-platform/ui/server';

export default async function DhoLayout({
  children,
  params: { id: daoSlug, lang },
}: {
  children: React.ReactNode;
  params: { id: string; lang: Locale };
}) {
  const newtoken = await getAccessToken();
  const dao = await getDaoDetail({ token: newtoken.accessJWT, daoSlug });

  return (
    <div className="flex flex-grow w-full h-full">
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
      >
        <MenuTop.RightSlot>
          <ButtonProfile
            avatarSrc="https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop"
            userName="Jane Doe"
          />
        </MenuTop.RightSlot>
      </MenuTop>
      <div className="fixed bottom-0 right-0 flex-grow p-10 overflow-y-auto top-20 left-20 bg-background/5">
        {children}
      </div>
    </div>
  );
}
