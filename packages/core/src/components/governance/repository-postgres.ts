import { eq } from 'drizzle-orm';
import {
  documents,
  Document as DbDocument,
  db,
} from '@hypha-platform/storage-postgres';
import { Document, DocumentState } from './types';
import { DocumentRepository } from './repository';
import invariant from 'tiny-invariant';

export class DocumentRepositoryPostgres implements DocumentRepository {
  private mapToDocument(dbDocument: DbDocument): Document {
    // invariant(dbDocument.createdAt, 'Document createdAt is required');
    // invariant(dbDocument.updatedAt, 'Document updatedAt is required');
    return {
      id: dbDocument.id,
      creatorId: dbDocument.creatorId,
      title: dbDocument.title ?? '',
      description: dbDocument.description ?? null,
      slug: dbDocument.slug ?? '',
      state: dbDocument.state as DocumentState,
      createdAt: dbDocument.createdAt,
      updatedAt: dbDocument.updatedAt,
    };
  }

  async findById(id: number): Promise<Document | null> {
    const result = await db
      .select()
      .from(documents)
      .where(eq(documents.id, id))
      .limit(1);

    return result[0] ? this.mapToDocument(result[0]) : null;
  }

  async findBySlug(slug: string): Promise<Document | null> {
    const result = await db
      .select()
      .from(documents)
      .where(eq(documents.slug, slug))
      .limit(1);

    return result[0] ? this.mapToDocument(result[0]) : null;
  }

  async findAll(): Promise<Document[]> {
    const results = await db.select().from(documents);
    return results.map(this.mapToDocument);
  }
}
