'use server';

import { getContainer, defaultConfig } from '@hypha-platform/core';
import { PeopleService, PeopleFindBySpaceConfig } from '@hypha-platform/core';

export const fetchSpaceMemberBySpaceSlug = async (
  { spaceSlug }: { spaceSlug: string },
  config: PeopleFindBySpaceConfig = {
    pagination: { page: 1, pageSize: 10 },
  },
) => {
  const container = getContainer(defaultConfig);
  const peopleService = new PeopleService(container);
  const people = await peopleService.findBySpaceSlug({ spaceSlug }, config);

  return people;
};

export const fetchMemberBySlug = async ({ slug }: { slug: string }) => {
  const container = getContainer(defaultConfig);
  const peopleService = new PeopleService(container);
  const person = await peopleService.findBySlug({ slug });
  return person;
};
