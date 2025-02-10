import { memberships } from './membership';
import { people } from './people';
import { spaces } from './space';
import { spaceConfigs } from './space-config';
export * from './membership';
export * from './people';
export * from './space-config';
export * from './space';
export const schema = {
  memberships,
  people,
  spaceConfigs,
  spaces,
};
