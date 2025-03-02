import { eq } from 'drizzle-orm';
import {
  documents,
  Document as DbDocument,
  db as defaultDb,
} from '@hypha-platform/storage-postgres';
import { Document, DocumentState } from './types';
import { DocumentRepository } from './repository';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '@hypha-platform/storage-postgres';

export class DocumentRepositoryPostgres implements DocumentRepository {
  private db: NodePgDatabase<typeof schema>;

  constructor(db: NodePgDatabase<typeof schema> = defaultDb) {
    this.db = db;
  }

  private mapToDocument(dbDocument: DbDocument): Document {
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
    const result = await this.db
      .select()
      .from(documents)
      .where(eq(documents.id, id))
      .limit(1);

    return result[0] ? this.mapToDocument(result[0]) : null;
  }

  async findBySlug(slug: string): Promise<Document | null> {
    const result = await this.db
      .select()
      .from(documents)
      .where(eq(documents.slug, slug))
      .limit(1);

    return result[0] ? this.mapToDocument(result[0]) : null;
  }

  async findAll(): Promise<Document[]> {
    const results = await this.db.select().from(documents);
    return results.map(this.mapToDocument);
  }

  async findMostRecent(): Promise<Document | null> {
    const results = await this.db
      .select()
      .from(documents)
      .orderBy(documents.createdAt)
      .limit(1);

    return results.length > 0 ? this.mapToDocument(results[0]) : null;
  }
}
