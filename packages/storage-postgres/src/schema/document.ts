import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  varchar,
  jsonb,
} from 'drizzle-orm/pg-core';
import { commonDateFields } from './shared';
import { people } from './people';
import { spaces } from './space';
export const documentStateEnum = pgEnum('document_state', [
  'discussion',
  'proposal',
  'agreement',
]);

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  creatorId: integer('creator_id')
    .notNull()
    .references(() => people.id),
  spaceId: integer('space_id').references(() => spaces.id),
  title: text('title'),
  description: text('description'),
  state: documentStateEnum('state').default('proposal'),
  slug: varchar('slug', { length: 255 }),
  leadImage: text('lead_image'),
  attachments: jsonb('attachments').$type<string[]>().default([]),
  web3ProposalId: integer('web3_proposal_id'),
  ...commonDateFields,
});

export type Document = InferSelectModel<typeof documents>;
export type NewDocument = InferInsertModel<typeof documents>;
