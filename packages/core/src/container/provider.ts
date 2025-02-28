/**
 * @deprecated This file is for backward compatibility only and will be removed in a future version.
 * Use the new container-facade.ts instead.
 */

import { cache } from 'react';
import { Container } from './types';
import { CoreConfig } from '../config/types';
import { getCompatContainer } from './compat';

/**
 * @deprecated Use getContainer() from container-facade.ts instead
 */
export const getContainer = cache((config: CoreConfig): Container => {
  console.warn(
    'Warning: getContainer() from provider.ts is deprecated. Use getContainer() from container-facade.ts instead.',
  );
  return getCompatContainer(config);
});

/**
 * @deprecated Use createRequestScope() from container-facade.ts instead
 */
export const getScopedContainer = cache(
  async (config: CoreConfig, spaceSlug?: string): Promise<Container> => {
    console.warn(
      'Warning: getScopedContainer() is deprecated. Use createRequestScope() from container-facade.ts instead.',
    );
    return getCompatContainer(config);
  },
);
