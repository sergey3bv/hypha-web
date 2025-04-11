import { pgEnum } from 'drizzle-orm/pg-core';

export const categories = pgEnum('categories', [
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
