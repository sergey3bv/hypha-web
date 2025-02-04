'use server';

import { getContainer, defaultConfig } from '@hypha-platform/core';
import { PeopleService } from '@hypha-platform/core';

export const fetchMembers = async ({ spaceId }: { spaceId: number }) => {
  const container = getContainer(defaultConfig);
  const peopleService = new PeopleService(container);
  const people = await peopleService.findBySpaceId({ spaceId });

  return people;
};

export const fetchMemberBySlug = async ({ slug }: { slug: string }) => {
  const container = getContainer(defaultConfig);
  const peopleService = new PeopleService(container);
  const person = await peopleService.findBySlug({ slug });
  return person;
};
