'use server';

import {
  defaultConfig,
  getContainer,
  getScopedContainer,
} from '@hypha-platform/core';
import { SpaceService } from '@hypha-platform/core';

export async function readAllSpaces() {
  'use server';

  const container = getContainer(defaultConfig);
  const spaceService = new SpaceService(container);

  return spaceService.getAll();
}

export async function readSpaceBySlug(slug: string) {
  'use server';

  const container = await getScopedContainer(defaultConfig, slug);
  const spaceService = new SpaceService(container);

  return spaceService.getBySlug(slug);
}
