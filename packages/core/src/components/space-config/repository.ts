import { SpaceConfig, NewSpaceConfig, UpdateSpaceConfig } from './types';

export interface SpaceConfigRepository {
  findBySpaceSlug(spaceSlug: string): Promise<SpaceConfig | null>;
  create(config: NewSpaceConfig): Promise<SpaceConfig>;
  update(spaceSlug: string, config: UpdateSpaceConfig): Promise<SpaceConfig>;
  delete(spaceSlug: string): Promise<void>;
}
