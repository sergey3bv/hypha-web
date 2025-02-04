import { PeopleRepository } from './repository';
import { Person } from './types';
import {
  db as defaultDb,
  memberships,
  people,
} from '@hypha-platform/storage-postgres';
import { eq } from 'drizzle-orm';
import type { Database } from '@hypha-platform/storage-postgres';

export class PeopleRepositoryPostgres implements PeopleRepository {
  constructor(private db: Database = defaultDb) {}

  async findAll(): Promise<Person[]> {
    return this.db.select().from(people);
  }

  async findById(id: number): Promise<Person | null> {
    const [person] = await this.db
      .select()
      .from(people)
      .where(eq(people.id, id))
      .limit(1);

    return person;
  }

  async findBySpaceId({ spaceId }: { spaceId: number }): Promise<Person[]> {
    const result = await this.db
      .select({
        id: people.id,
        name: people.name,
        email: people.email,
        slug: people.slug,
        avatarUrl: people.avatarUrl,
        description: people.description,
        location: people.location,
        nickname: people.nickname,
        surname: people.surname,
      })
      .from(people)
      .innerJoin(memberships, eq(memberships.personId, people.id))
      .where(eq(memberships.spaceId, spaceId));
    return result;
  }

  async findBySlug({ slug }: { slug: string }): Promise<Person> {
    const [person] = await this.db
      .select()
      .from(people)
      .where(eq(people.slug, slug))
      .limit(1);
    return person;
  }

  async create(person: Person): Promise<Person> {
    const [result] = await this.db.insert(people).values(person).returning();
    return result;
  }

  async update(person: Person): Promise<Person> {
    const [result] = await this.db
      .update(people)
      .set(person)
      .where(eq(people.id, person.id))
      .returning();
    return result;
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(people).where(eq(people.id, id));
  }
}
