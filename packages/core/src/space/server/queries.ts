import { asc, eq, sql } from 'drizzle-orm';
import {
  memberships,
  Space,
  spaces,
  documents,
} from '@hypha-platform/storage-postgres';
import { DbConfig } from '@core/common/server';

export const findAllSpaces = async ({ db }: DbConfig) => {
  const results = await db
    .select({
      id: spaces.id,
      logoUrl: spaces.logoUrl,
      leadImage: spaces.leadImage,
      title: spaces.title,
      description: spaces.description,
      slug: spaces.slug,
      web3SpaceId: spaces.web3SpaceId,
      links: spaces.links,
      categories: spaces.categories,
      parentId: spaces.parentId,
      createdAt: spaces.createdAt,
      updatedAt: spaces.updatedAt,
      memberCount: sql<number>`count(distinct ${memberships.personId})`.mapWith(
        Number,
      ),
      documentCount: sql<number>`count(distinct ${documents.id})`.mapWith(
        Number,
      ),
    })
    .from(spaces)
    .leftJoin(memberships, eq(memberships.spaceId, spaces.id))
    .leftJoin(documents, eq(documents.spaceId, spaces.id))
    .groupBy(
      spaces.id,
      spaces.logoUrl,
      spaces.leadImage,
      spaces.title,
      spaces.description,
      spaces.slug,
      spaces.web3SpaceId,
      spaces.links,
      spaces.categories,
      spaces.parentId,
      spaces.createdAt,
      spaces.updatedAt,
    )
    .orderBy(asc(spaces.title));
  return results;
};
export const findSpaceById = async (
  { id }: { id: number },
  { db }: DbConfig,
) => {
  const results = await db.select().from(spaces).where(eq(spaces.id, id));
  return results[0] || null;
};

type FindSpaceBySlugInput = { slug: string };

export const findSpaceBySlug = async (
  { slug }: FindSpaceBySlugInput,
  { db }: DbConfig,
): Promise<(Space & { subspaces: Space[] }) | null> => {
  const space = await db.query.spaces.findFirst({
    where: (spaces, { eq }) => eq(spaces.slug, slug),
    with: {
      subspaces: true,
      members: true,
      documents: true,
    },
  });

  return space ?? null;
};

type FindAllSpacesByMemberIdInput = {
  memberId: number;
};
export const findAllSpacesByMemberId = async (
  { memberId }: FindAllSpacesByMemberIdInput,
  { db }: DbConfig,
) => {
  const results = await db
    .select()
    .from(spaces)
    .innerJoin(memberships, eq(memberships.spaceId, spaces.id))
    .where(eq(memberships.personId, memberId))
    .orderBy(asc(spaces.title));

  return results.map((row) => row.spaces);
};
