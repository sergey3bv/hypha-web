import { Locale } from "@hypha-platform/i18n";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hypha-platform/ui/server";
import Link from "next/link";

type PageProps = {
  params: { lang: Locale; id: string };
};

export default async function AgreementsPage({ params: { lang, id } }: PageProps) {
  return (
    <div>
      <Tabs value="membership" className="w-full mt-16">
        <TabsList className='w-full'>
          <TabsTrigger asChild value="agreements" className="w-full" variant="ghost">
            <Link href={`/${lang}/my-spaces/${id}/agreements`} className="w-full" passHref>
              Agreements
            </Link>
          </TabsTrigger>
          <TabsTrigger asChild value="membership" className="w-full" variant="ghost">
            <Link href={`/${lang}/my-spaces/${id}/membership`} className="w-full" passHref>
              Membership
            </Link>
          </TabsTrigger>
          <TabsTrigger asChild value="treasury" className="w-full" variant="ghost">
            <Link href={`/${lang}/my-spaces/${id}/treasury`} className="w-full" passHref>
              Treasury
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="membership">
          <div className='flex justify-between items-center mt-10'>
            Membership
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}