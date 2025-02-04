import { people } from '@hypha-platform/storage-postgres';
import { Person } from './types';

export interface PeopleRepository {
  findAll(): Promise<Person[]>;
  findById(id: number): Promise<Person | null>;
  findBySpaceId({ spaceId }: { spaceId: number }): Promise<Person[]>;
  findBySlug({ slug }: { slug: string }): Promise<Person>;
  create(person: Person): Promise<Person>;
  update(person: Person): Promise<Person>;
  delete(id: number): Promise<void>;
}
