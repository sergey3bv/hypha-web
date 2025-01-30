'use client';

import { Text } from '@radix-ui/themes';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Button,
} from '@hypha-platform/ui';
import Link from 'next/link';
import { SpaceType } from '@hypha-platform/graphql/rsc';
import { Locale } from '@hypha-platform/i18n';
import { CardOrganisation } from './card-organisation';

type SpaceGroupSliderProps = {
  spaces?: SpaceType[];
  isLoading?: boolean;
  lang?: Locale;
  type?: string;
};

export const SpaceGroupSlider = ({
  spaces,
  isLoading,
  lang,
  type,
}: SpaceGroupSliderProps) => {
  const getDhoPathAgreements = (lang: Locale, id: string) => {
    return `/${lang}/dho/${id}/agreements`;
  };

  return (
    <div className="border-t-2 border-primary-foreground pt-6">
      <div className="flex justify-between items-center">
        <Text className="text-4 font-medium">
          {type} | {spaces?.length}
        </Text>
        <Button variant="ghost" className="text-accent-11">
          See all
        </Button>
      </div>
      <Carousel className="my-6">
        <CarouselContent>
          {spaces?.map((space) => (
            <CarouselItem
              key={space.title}
              className="mb-5 w-full sm:w-[454px] max-w-[454px] flex-shrink-0"
            >
              <Link
                className="w-96"
                href={getDhoPathAgreements(lang || 'en', space.slug as string)}
              >
                <CardOrganisation
                  createdDate={space.createdDate ?? ''}
                  description={space.description as string}
                  icon={space.image ?? ''}
                  members={space.members?.length ?? 0}
                  agreements={space.agreements?.length ?? 0}
                  title={space.title as string}
                  isLoading={isLoading}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
