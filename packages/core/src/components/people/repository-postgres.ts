import { PeopleRepository } from './repository';
import { Person } from './types';
import {
  db as defaultDb,
  memberships,
  people,
  Person as DbPerson,
} from '@hypha-platform/storage-postgres';
import { eq } from 'drizzle-orm';
import type { Database } from '@hypha-platform/storage-postgres';
import { nullToUndefined } from '../../utils/null-to-undefined';
import invariant from 'tiny-invariant';

export class PeopleRepositoryPostgres implements PeopleRepository {
  constructor(private db: Database = defaultDb) {}

  private mapToDomainPerson(dbPerson: DbPerson): Person {
    invariant(dbPerson.slug, 'Person must have a slug');

    return {
      id: dbPerson.id,
      name: nullToUndefined(dbPerson.name),
      surname: nullToUndefined(dbPerson.surname),
      email: nullToUndefined(dbPerson.email),
      slug: dbPerson.slug,
      avatarUrl: nullToUndefined(dbPerson.avatarUrl),
      description: nullToUndefined(dbPerson.description),
      location: nullToUndefined(dbPerson.location),
      nickname: nullToUndefined(dbPerson.nickname),
    };
  }

  async findAll(): Promise<Person[]> {
    const dbPeople = await this.db.select().from(people);
    return dbPeople.map(this.mapToDomainPerson);
  }

  async findById(id: number): Promise<Person | null> {
    const [dbPerson] = await this.db
      .select()
      .from(people)
      .where(eq(people.id, id))
      .limit(1);

    return dbPerson ? this.mapToDomainPerson(dbPerson) : null;
  }

  async findBySpaceId({ spaceId }: { spaceId: number }): Promise<Person[]> {
    const result = await this.db
      .select()
      .from(people)
      .innerJoin(memberships, eq(memberships.personId, people.id))
      .where(eq(memberships.spaceId, spaceId));

    return result.map((r) => this.mapToDomainPerson(r.people));
  }

  async findBySlug({ slug }: { slug: string }): Promise<Person> {
    const [dbPerson] = await this.db
      .select()
      .from(people)
      .where(eq(people.slug, slug))
      .limit(1);

    return this.mapToDomainPerson(dbPerson);
  }

  async create(person: Person): Promise<Person> {
    const [dbPerson] = await this.db.insert(people).values(person).returning();
    return this.mapToDomainPerson(dbPerson);
  }

  async update(person: Person): Promise<Person> {
    const [dbPerson] = await this.db
      .update(people)
      .set(person)
      .where(eq(people.id, person.id))
      .returning();
    return this.mapToDomainPerson(dbPerson);
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(people).where(eq(people.id, id));
  }
}
