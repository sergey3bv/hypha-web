import { inject, injectable } from 'inversify';
import { SpaceRepository } from './repository';
import { Space } from './types';
import { SpaceNotFoundError } from './errors';
import { Tokens } from '../../container/tokens';

@injectable()
export class SpaceService {
  constructor(
    @inject(Tokens.SpaceRepository)
    private repository: SpaceRepository,
  ) {}

  async getAll(): Promise<Space[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<Space> {
    const space = await this.repository.findById(id);
    if (!space) {
      throw new SpaceNotFoundError(id);
    }
    return space;
  }

  async getAllByMemberId(memberId: number): Promise<Space[]> {
    return this.repository.findAllByMemberId(memberId);
  }

  async getBySlug({ slug }: { slug: string }): Promise<Space> {
    const space = await this.repository.findBySlug(slug);
    if (!space) {
      throw new SpaceNotFoundError(slug);
    }
    return space;
  }
}
