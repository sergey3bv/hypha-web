import { getDaoList } from "./list"

export const getUserDaos = async ({ token }: { token: string }) => {
  const [one, two, three] = await getDaoList({ token});
  return [one, two, three]
}
