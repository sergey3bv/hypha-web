import { asc, eq } from 'drizzle-orm';
import {
  db as defaultDb,
  spaces,
  memberships,
  schema,
} from '@hypha-platform/storage-postgres';
import { Space } from './types';
import { SpaceRepository } from './repository';
import { Database } from '@hypha-platform/storage-postgres';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class SpacePostgresRepository implements SpaceRepository {
  constructor(
    private db: Database | NodePgDatabase<typeof schema> = defaultDb,
  ) {}

  async findAll(): Promise<Space[]> {
    const results = await this.db
      .select()
      .from(spaces)
      .orderBy(asc(spaces.title));
    return results;
  }

  async findById(id: number): Promise<Space | null> {
    const results = await this.db
      .select()
      .from(spaces)
      .where(eq(spaces.id, id));
    return results[0] || null;
  }

  async findBySlug(slug: string): Promise<Space | null> {
    const results = await this.db
      .select()
      .from(spaces)
      .where(eq(spaces.slug, slug));
    return results[0] || null;
  }

  async findAllByMemberId(memberId: number): Promise<Space[]> {
    const results = await this.db
      .select()
      .from(spaces)
      .innerJoin(memberships, eq(memberships.spaceId, spaces.id))
      .where(eq(memberships.personId, memberId))
      .orderBy(asc(spaces.title));

    return results.map((row) => row.spaces);
  }
}
