import { Person } from './types';
import { PaginationParams, PaginatedResponse } from '@hypha-platform/core';

export type PeopleFindAllConfig = {
  pagination: PaginationParams<Person>;
};

export interface PeopleRepository {
  findAll(config: PeopleFindAllConfig): Promise<PaginatedResponse<Person>>;
  findById(id: number): Promise<Person | null>;
  findBySpaceId({ spaceId }: { spaceId: number }): Promise<Person[]>;
  findBySlug({ slug }: { slug: string }): Promise<Person>;
  create(person: Person): Promise<Person>;
  update(person: Person): Promise<Person>;
  delete(id: number): Promise<void>;
}
