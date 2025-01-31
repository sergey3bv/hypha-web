import { eq } from 'drizzle-orm';
import { SpaceConfig } from './types';
import { db } from '@hypha-platform/storage-postgres';
import { spaceConfigs } from '@hypha-platform/storage-postgres';
import { SpaceConfigRepository } from './repository';

export class SpaceConfigPostgresRepository implements SpaceConfigRepository {
  async findBySpaceSlug(spaceSlug: string): Promise<SpaceConfig | null> {
    const [result] = await db
      .select()
      .from(spaceConfigs)
      .where(eq(spaceConfigs.spaceSlug, spaceSlug));

    return result || null;
  }

  async create(config: Omit<SpaceConfig, 'id'>): Promise<SpaceConfig> {
    const [created] = await db
      .insert(spaceConfigs)
      .values({ ...config, spaceSlug: config.spaceSlug })
      .returning();
    return created;
  }

  async update(
    spaceSlug: string,
    config: Partial<SpaceConfig>,
  ): Promise<SpaceConfig> {
    const [updated] = await db
      .update(spaceConfigs)
      .set({ ...config })
      .where(eq(spaceConfigs.spaceSlug, spaceSlug))
      .returning();

    if (!updated) {
      throw new Error(`Space config for space ${spaceSlug} not found`);
    }

    return updated;
  }

  async delete(spaceSlug: string): Promise<void> {
    await db.delete(spaceConfigs).where(eq(spaceConfigs.spaceSlug, spaceSlug));
  }
}
