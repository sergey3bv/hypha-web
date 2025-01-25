import { getDaoList, getAccessToken } from '@hypha-platform/graphql/rsc';
import { writeJson } from './utils/file-writer';

type Dao = {
  id: string;
  slug: string;
  title: string;
  description: string;
  logo_url: string;
};

const mapToDaoType = (dao: {
  id: string;
  url: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  logo: string | null | undefined;
}): Dao => {
  return {
    id: dao.id,
    slug: dao.url ?? 'MISSING_AT_IMPORT',
    title: dao.title ?? 'MISSING_AT_IMPORT',
    description: dao.description ?? 'MISSING_AT_IMPORT',
    logo_url: dao.logo ?? 'MISSING_AT_IMPORT',
  };
};

export const daosToJson = async (outputPath: string) => {
  const token = await getAccessToken();
  const daos = await getDaoList({
    token: token.accessJWT,
  });

  await writeJson(outputPath, daos.map(mapToDaoType));
  return daos;
};
