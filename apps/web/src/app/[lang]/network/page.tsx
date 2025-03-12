import { Locale } from '@hypha-platform/i18n';
import { Container } from '@hypha-platform/ui';
import { Text } from '@radix-ui/themes';
import { SpaceGroupSlider, SpaceSearch } from '@hypha-platform/epics';
import { getDhoPathAgreements } from '../dho/[id]/agreements/constants';
import { createSpaceService } from '@hypha-platform/core';

type PageProps = {
  params: Promise<{ lang: Locale; id: string }>;
};

export default async function Index(props: PageProps) {
  const params = await props.params;

  const { lang } = params;

  const getHref = (id: string) => {
    return getDhoPathAgreements(lang, id);
  };

  const spaces = await createSpaceService().getAll();

  return (
    <Container>
      <Text className="text-9 text-center flex mb-8">
        Explore hundreds of Spaces in the Hypha Network
      </Text>
      <SpaceSearch />
      <SpaceGroupSlider spaces={spaces} type="Hypha" getHref={getHref} />
    </Container>
  );
}
