import { inject, injectable } from 'inversify';
import { Tokens } from '../../container/tokens';
import { Document } from './types';
import { DocumentRepository } from './repository';
import { DocumentNotFoundError } from './errors';

@injectable()
export class DocumentService {
  constructor(
    @inject(Tokens.DocumentRepository)
    private repository: DocumentRepository,
  ) {}

  async getAll(): Promise<Document[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<Document> {
    const document = await this.repository.findById(id);
    if (!document) {
      throw new DocumentNotFoundError(id);
    }
    return document;
  }

  async getBySlug(slug: string): Promise<Document> {
    const document = await this.repository.findBySlug(slug);
    if (!document) {
      throw new DocumentNotFoundError(slug);
    }
    return document;
  }
}
