import { describe, it, expect, afterAll, beforeEach } from 'vitest';
import {
  documents,
  memberships,
  people,
} from '@hypha-platform/storage-postgres';
import { eq } from 'drizzle-orm';
import { PeopleRepositoryPostgres } from './repository-postgres';
import { db } from '../../test-utils/setup';

describe('PeopleRepositoryPostgres', () => {
  let repository: PeopleRepositoryPostgres;

  const peopleToDelete = [];

  beforeEach(async () => {
    repository = new PeopleRepositoryPostgres(db);
    // Delete in correct order to handle foreign key constraints
    await db.delete(memberships);
    await db.delete(documents);
    await db.delete(people);
  });

  // Clean up the database before each test
  afterAll(async () => {
    for (const id of peopleToDelete) {
      // Delete memberships first
      await db.delete(memberships).where(eq(memberships.personId, id));
      // Then delete the person
      await db.delete(people).where(eq(people.id, id));
    }
  });

  describe('findAll', () => {
    it('should return paginated results', async () => {
      // Arrange: Insert test data
      const testPeople = [
        {
          name: 'John',
          surname: 'Doe',
          email: 'john@example.com',
          slug: 'john-doe',
        },
        {
          name: 'Jane',
          surname: 'Smith',
          email: 'jane@example.com',
          slug: 'jane-smith',
        },
        {
          name: 'Bob',
          surname: 'Johnson',
          email: 'bob@example.com',
          slug: 'bob-johnson',
        },
      ];

      const dbPeople = await db.insert(people).values(testPeople).returning();
      peopleToDelete.push(...dbPeople.map((person) => person.id));

      // Act: Call findAll with pagination
      const result = await repository.findAll({
        pagination: { page: 1, pageSize: 2 },
      });

      // Assert
      expect(result.data).toHaveLength(2);
      expect(result.pagination).toEqual({
        total: 3,
        page: 1,
        pageSize: 2,
        totalPages: 2,
        hasNextPage: true,
        hasPreviousPage: false,
      });

      // Verify the returned data structure
      expect(result.data[0]).toMatchObject({
        name: expect.any(String),
        surname: expect.any(String),
        email: expect.any(String),
        slug: expect.any(String),
        id: expect.any(Number),
      });
    });

    it('should return empty results when no people exist', async () => {
      // Act
      const result = await repository.findAll({
        pagination: { page: 1, pageSize: 10 },
      });

      // Assert
      expect(result.data).toHaveLength(0);
      expect(result.pagination).toEqual({
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      });
    });
  });
});
