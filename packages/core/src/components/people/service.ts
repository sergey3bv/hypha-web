import { PeopleRepository } from './repository';
import { Container } from '../../container/types';
import { Tokens } from '../../container/tokens';
import { Person } from './types';

export class PeopleService {
  private repository: PeopleRepository;

  constructor(private container: Container) {
    this.repository = container.get(Tokens.PeopleRepository);
  }

  async findBySpaceId({ spaceId }: { spaceId: number }): Promise<Person[]> {
    return this.repository.findBySpaceId({ spaceId });
  }

  async findBySlug({ slug }: { slug: string }): Promise<Person> {
    return this.repository.findBySlug({ slug });
  }

  async create(person: Person): Promise<Person> {
    return this.repository.create(person);
  }

  async readAll(): Promise<Person[]> {
    return this.repository.findAll();
  }

  async update(person: Person): Promise<Person> {
    return this.repository.update(person);
  }
}
