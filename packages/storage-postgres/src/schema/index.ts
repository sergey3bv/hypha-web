import { memberships } from './membership';
import { people } from './people';
import { spaces } from './space';
import { spaceConfigs } from './space-config';
import { documents } from './document';

export * from './document';
export * from './membership';
export * from './people';
export * from './space-config';
export * from './space';

export const schema = {
  documents,
  memberships,
  people,
  spaceConfigs,
  spaces,
};
