import {
  PeopleRepository,
  PeopleFindAllConfig,
  PeopleFindBySpaceConfig,
} from './repository';
import { Container } from '../../container/types';
import { Tokens } from '../../container/tokens';
import { Person } from './types';
import { PaginatedResponse } from '@hypha-platform/core';

export class PeopleService {
  private repository: PeopleRepository;

  constructor(private container: Container) {
    this.repository = container.get(Tokens.PeopleRepository);
  }

  async findBySpaceId(
    { spaceId }: { spaceId: number },
    config: PeopleFindBySpaceConfig = {
      pagination: { page: 1, pageSize: 10 },
    },
  ): Promise<PaginatedResponse<Person>> {
    return this.repository.findBySpaceId({ spaceId }, config);
  }

  async findBySpaceSlug(
    { spaceSlug }: { spaceSlug: string },
    config: PeopleFindBySpaceConfig,
  ): Promise<PaginatedResponse<Person>> {
    return this.repository.findBySpaceSlug({ spaceSlug }, config);
  }

  async findBySlug({ slug }: { slug: string }): Promise<Person> {
    return this.repository.findBySlug({ slug });
  }

  async create(person: Person): Promise<Person> {
    return this.repository.create(person);
  }

  async readAll(
    config: PeopleFindAllConfig,
  ): Promise<PaginatedResponse<Person>> {
    return this.repository.findAll(config);
  }

  async update(person: Person): Promise<Person> {
    return this.repository.update(person);
  }
}
