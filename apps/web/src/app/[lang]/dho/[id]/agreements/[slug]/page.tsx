type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Agreements(props: PageProps) {
  const params = await props.params;
  const { slug } = params;

  return <div>Agreements: {slug}</div>;
}
