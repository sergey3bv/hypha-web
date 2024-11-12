import { getAccessToken, getDaoList } from '@hypha-platform/graphql/rsc';
import { CardOrganisation } from '@hypha-platform/epics';
import Link from 'next/link';
import { Locale } from '@hypha-platform/i18n';
import { getAssignmentsPath } from './dho/[id]/assignments/constants';
import { Heading } from 'packages/ui/src/atoms/heading'

type PageProps = {
  params: { lang: Locale; id: string };
};

export default async function Index({ params: { lang } }: PageProps) {
  const newtoken = await getAccessToken();
  const daos = await getDaoList({ token: newtoken.accessJWT });

  return (
    <div className="px-6 py-4">
      <Heading className="mb-4" size="9" color="primary" weight="medium" align="center">All your spaces, in one place</Heading>
        <div className="grid grid-cols-4 gap-4">
          {daos.map((dao) => (
            <div key={dao.name}>
              <Link href={getAssignmentsPath(lang, dao.url as string)}>
                <CardOrganisation
                  createdDate={dao.date}
                  description={dao.description as string}
                  icon={dao.logo}
                  members={0}
                  title={dao.title as string}
                />
              </Link>
            </div>
          ))}
        </div>
    </div>
  );
}
