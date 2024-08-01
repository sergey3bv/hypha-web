import { fetchAccessToken, getDaoList } from '@hypha-platform/graphql/rsc';
import Link from 'next/link';


export default async function Index() {
  const newtoken = await fetchAccessToken();

  const daos = await getDaoList({ token: newtoken.accessJWT });
  console.debug({ daos: JSON.stringify(daos), newtoken });
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
