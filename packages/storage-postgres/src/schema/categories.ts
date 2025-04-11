import { pgEnum } from 'drizzle-orm/pg-core';

export const categories = pgEnum('document_state', [
  'housing',
  'energy',
  'mobility',
  'water',
  'air',
  'soil',
  'flora',
  'fauna',
  'fungi',
  'food',
  'education',
  'art',
  'health',
  'tech',
]);
