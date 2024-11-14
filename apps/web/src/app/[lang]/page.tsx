import { getAccessToken, getDaoList } from '@hypha-platform/graphql/rsc';
import { CardOrganisation } from '@hypha-platform/epics';
import Link from 'next/link';
import { Locale } from '@hypha-platform/i18n';
import { getAssignmentsPath } from './dho/[id]/assignments/constants';
import { Container, Carousel, CarouselItem, CarouselContent } from '@hypha-platform/ui';
import { Heading } from 'packages/ui/src/atoms/heading';
import { Footer } from '@hypha-platform/ui/server';
import { Text } from '@radix-ui/themes';

type PageProps = {
  params: { lang: Locale; id: string };
};

export default async function Index({ params: { lang } }: PageProps) {
  const newtoken = await getAccessToken();
  const daos = await getDaoList({ token: newtoken.accessJWT });

  return (
    <div className="w-full overflow-auto">
      <Container>
        <Heading className="mb-4 mt-3" size="8" color="secondary" weight="medium" align="center">
          All your spaces, in one place
        </Heading>
        <div data-testid="dho-list-container" className="w-full mb-8">
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
        <Text className='text-3'>Spaces you might like</Text>
        <Carousel className='my-8'>
          <CarouselContent>
            {daos.map((dao) => (
              <CarouselItem
                key={dao.name}
                className="mb-5 w-full sm:w-[454px] max-w-[454px] flex-shrink-0"
              >
                <Link className="w-96" href={getAssignmentsPath(lang, dao.url as string)}>
                  <CardOrganisation
                    createdDate={dao.date}
                    description={dao.description as string}
                    icon={dao.logo}
                    members={0}
                    agreements={0}
                    title={dao.title as string}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
      <Footer />
    </div>
  );
}
