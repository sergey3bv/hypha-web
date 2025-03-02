import { eq } from 'drizzle-orm';
import { SpaceConfig, NewSpaceConfig, UpdateSpaceConfig } from './types';
import { db as defaultDb, Database } from '@hypha-platform/storage-postgres';
import { spaceConfigs } from '@hypha-platform/storage-postgres';
import { SpaceConfigRepository } from './repository';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '@hypha-platform/storage-postgres';

export class SpaceConfigPostgresRepository implements SpaceConfigRepository {
  private db: Database | NodePgDatabase<typeof schema>;

  constructor(db: Database | NodePgDatabase<typeof schema> = defaultDb) {
    this.db = db;
  }

  async findBySpaceSlug(spaceSlug: string): Promise<SpaceConfig | null> {
    const [result] = await this.db
      .select()
      .from(spaceConfigs)
      .where(eq(spaceConfigs.spaceSlug, spaceSlug));

    return result || null;
  }

  async create(config: NewSpaceConfig): Promise<SpaceConfig> {
    const [created] = await this.db
      .insert(spaceConfigs)
      .values(config)
      .returning();
    return created;
  }

  async update(
    spaceSlug: string,
    config: UpdateSpaceConfig,
  ): Promise<SpaceConfig> {
    const [updated] = await this.db
      .update(spaceConfigs)
      .set(config)
      .where(eq(spaceConfigs.spaceSlug, spaceSlug))
      .returning();

    if (!updated) {
      throw new Error(`Space config for space ${spaceSlug} not found`);
    }

    return updated;
  }

  async delete(spaceSlug: string): Promise<void> {
    await this.db
      .delete(spaceConfigs)
      .where(eq(spaceConfigs.spaceSlug, spaceSlug));
  }
}
