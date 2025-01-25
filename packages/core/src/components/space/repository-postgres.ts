import { eq } from 'drizzle-orm';
import { db, spaces } from '@hypha-platform/storage-postgres';
import { Space } from './types';
import { SpaceRepository } from './repository';

export class PostgresSpaceRepository implements SpaceRepository {
  async findById(id: number): Promise<Space | null> {
    const results = await db.select().from(spaces).where(eq(spaces.id, id));
    return results[0] || null;
  }

  async findBySlug(slug: string): Promise<Space | null> {
    const results = await db.select().from(spaces).where(eq(spaces.slug, slug));
    return results[0] || null;
  }
}
