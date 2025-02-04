import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { commonDateFields } from './shared';

export const people = pgTable('people', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  ...commonDateFields,
});

export type Person = InferSelectModel<typeof people>;
export type NewPerson = InferInsertModel<typeof people>;
