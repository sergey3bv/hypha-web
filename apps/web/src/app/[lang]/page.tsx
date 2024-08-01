import { getDaoList } from '@hypha-platform/graphql/rsc';
import Link from 'next/link';

const token = process.env.DGRAPH_ACCESS_TOKEN as string;

export default async function Index() {
  const daos = await getDaoList({ token });
  console.debug({ daos: JSON.stringify(daos), token });
  return (
    <div>
      <h1>DHOs</h1>
      {/* <pre>{JSON.stringify(daos, null, 2)}</pre> */}
      <div>
        {daos.map((dao) => (
          <div key={dao.name}>
            <Link href={`/dho/${dao.url}`}>
              <div>
                <div className="flex">
                  <div>title:</div>
                  <div>{dao.title}</div>
                </div>
                <div className="flex">
                  <div>docId:</div>
                  <div>{dao.id}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
