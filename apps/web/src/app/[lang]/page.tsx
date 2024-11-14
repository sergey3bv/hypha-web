import { getAccessToken, getDaoList } from '@hypha-platform/graphql/rsc';
import { CardOrganisation } from '@hypha-platform/epics';
import Link from 'next/link';
import { Locale } from '@hypha-platform/i18n';
import { getAssignmentsPath } from './dho/[id]/assignments/constants';
import { Button, Container } from '@hypha-platform/ui';
import { Heading } from 'packages/ui/src/atoms/heading';
import { Footer } from '@hypha-platform/ui/server';
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { FilterMenu } from '@hypha-platform/ui';

type PageProps = {
  params: { lang: Locale; id: string };
};

type OptionType = {
  label: string,
  value: string
}

type SpacesFilterType = {
  value: string,
  options: OptionType[]
}

export default async function Index({ params: { lang } }: PageProps) {
  const newtoken = await getAccessToken();
  const daos = await getDaoList({ token: newtoken.accessJWT });

  const mySpacesCount:number = 2

  const filterSettings: SpacesFilterType = {
    value: 'my-spaces',
    options: [
      { label: 'All', value: 'all' },
      { label: 'My Spaces', value: 'my-spaces' }
    ],
  };

  return (
    <div className="w-full overflow-auto">
      <Container>
        <Heading className="mb-10 mt-3" size="8" color="secondary" weight="medium" align="center">All your spaces, in one place</Heading>
        <div className='mb-6 justify-between items-center flex'>
          <Text className='text-3'>My spaces | {mySpacesCount}</Text>
          <div className='flex items-center'>
            <FilterMenu
              value={filterSettings.value}
              options={filterSettings.options}
            />
            <Button className='ml-2' variant="action" size="sm">
              <PlusIcon className='mr-2'/>
              Create Space
            </Button>
          </div>
        </div>
        <div data-testid="dho-list-container" className="w-full">
          {daos.map((dao) => (
            <div key={dao.name} className="mb-5">
              <Link href={getAssignmentsPath(lang, dao.url as string)}>
                <CardOrganisation
                  createdDate={dao.date}
                  description={dao.description as string}
                  icon={dao.logo}
                  members={0}
                  agreements={0}
                  activeAgreements={1}
                  openDiscussions={1}
                  title={dao.title as string}
                />
              </Link>
            </div>
          ))}
        </div>
      </Container>
      <Footer/>
    </div>
  );
}
