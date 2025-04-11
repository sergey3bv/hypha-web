import { Locale } from '@hypha-platform/i18n';
import { Container } from '@hypha-platform/ui';
import { Text } from '@radix-ui/themes';
import { SpaceGroupSlider, SpaceSearch } from '@hypha-platform/epics';
import { getDhoPathAgreements } from '../dho/[id]/agreements/constants';
import { createSpaceService } from '@hypha-platform/core/server';

type PageProps = {
  params: Promise<{ lang: Locale; id: string }>;
};

function extractUniqueCategories(spaces: any[]): string[] {
  const categories = spaces.reduce((acc, space) => {
    if (space.categories) {
      acc.push(...space.categories);
    }
    return acc;
  }, [] as string[]);

  return Array.from(new Set(categories));
}

export default async function Index(props: PageProps) {
  const params = await props.params;

  const { lang } = params;

  const getHref = (id: string) => {
    return getDhoPathAgreements(lang, id);
  };

  const spaces = await createSpaceService().getAll();
  const uniqueCategories = extractUniqueCategories(spaces);

  return (
    <Container>
      <Text className="text-9 text-center flex mb-8">
        Explore hundreds of Spaces in the Hypha Network
      </Text>
      <SpaceSearch />
      {uniqueCategories.map((category) => (
        <SpaceGroupSlider
          key={category}
          spaces={spaces.filter(
            (space) => space.categories && space.categories.includes(category),
          )}
          type={category}
          getHref={getHref}
        />
      ))}
      <SpaceGroupSlider
        spaces={spaces.filter(
          (space) => space.categories && space.categories.length === 0,
        )}
        type={'No Category'}
        getHref={getHref}
      />
    </Container>
  );
}
