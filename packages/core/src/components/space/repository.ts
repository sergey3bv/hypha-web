import { Repository } from '../../container/types';
import { Space } from './types';

export interface SpaceRepository extends Repository {
  findById(id: number): Promise<Space | null>;
  findBySlug(slug: string): Promise<Space | null>;
  findAll(): Promise<Space[]>;
  findAllByMemberId(memberId: number): Promise<Space[]>;
}
