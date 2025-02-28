import { inject, injectable } from 'inversify';
import { SpaceConfig } from './types';
import { type SpaceConfigRepository } from './repository';
import { Tokens } from '../../container/tokens';
import { StorageType } from '../../config/types';

@injectable()
export class SpaceConfigService {
  constructor(
    @inject(Tokens.SpaceConfigRepository)
    private repository: SpaceConfigRepository,
  ) {}

  async getStorageConfig(spaceSlug: string): Promise<SpaceConfig['storage']> {
    const config = await this.repository.findBySpaceSlug(spaceSlug);

    return {
      space: 'postgres' as StorageType,
      agreement: 'postgres' as StorageType,
      member: 'postgres' as StorageType,
      comment: 'postgres' as StorageType,
      ...config?.storage,
    };
  }

  async setStorageConfig(
    spaceSlug: string,
    storage: Partial<SpaceConfig['storage']>,
  ): Promise<SpaceConfig> {
    const existing = await this.repository.findBySpaceSlug(spaceSlug);

    if (existing) {
      return this.repository.update(spaceSlug, {
        storage: { ...existing.storage, ...storage },
      });
    }

    return this.repository.create({
      spaceSlug,
      storage: {
        space: 'postgres',
        agreement: 'postgres',
        member: 'postgres',
        comment: 'postgres',
        ...storage,
      },
    });
  }

  async deleteConfig(spaceSlug: string): Promise<void> {
    await this.repository.delete(spaceSlug);
  }
}
