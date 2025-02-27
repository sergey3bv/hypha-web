import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { commonDateFields } from './shared';

export const people = pgTable('people', {
  id: serial('id').primaryKey(),
  sub: text('sub').unique(),
  slug: text('slug').unique(),
  avatarUrl: text('avatar_url'),
  description: text('description'),
  email: text('email').unique(),
  location: text('location'),
  name: text('name'),
  surname: text('surname'),
  nickname: text('nickname'),
  ...commonDateFields,
});

export type Person = InferSelectModel<typeof people>;
export type NewPerson = InferInsertModel<typeof people>;
