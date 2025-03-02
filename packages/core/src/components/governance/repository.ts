import { Document } from './types';

export interface DocumentRepository {
  findById(id: number): Promise<Document | null>;
  findBySlug(slug: string): Promise<Document | null>;
  findAll(): Promise<Document[]>;
  findAllBySpaceSlug({ spaceSlug }: { spaceSlug: string }): Promise<Document[]>;
}
