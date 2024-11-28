'use client';
import { Locale } from "@hypha-platform/i18n";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hypha-platform/ui/server";
import Link from "next/link";
import { ListOuterSpaces, ListInnerSpaces, ListMembers } from "@hypha-platform/epics";
import { listOuterSpacesData } from "@hypha-platform/ui-utils";
import { useState } from "react";

type PageProps = {
  params: { lang: Locale; id: string };
};

export default function MembershipPage({ params: { lang, id } }: PageProps) {
  const [outerSpaces, setOuterSpaces] = useState(listOuterSpacesData.spaces);

  const loadMoreOuterSpaces = () => {
    const newOuterSpaces = listOuterSpacesData.newOuterSpaces;
    setOuterSpaces(prevOuterSpaces => [...prevOuterSpaces, ...newOuterSpaces]);
  }
  return (
    <div>
      <Tabs value="membership" className="w-full mt-16">
        <TabsList className='w-full'>
          <TabsTrigger asChild value="agreements" className="w-full" variant="ghost">
            <Link href={`/${lang}/dho/${id}/agreements`} className="w-full" passHref>
              Agreements
            </Link>
          </TabsTrigger>
          <TabsTrigger asChild value="membership" className="w-full" variant="ghost">
            <Link href={`/${lang}/dho/${id}/membership`} className="w-full" passHref>
              Membership
            </Link>
          </TabsTrigger>
          <TabsTrigger asChild value="treasury" className="w-full" variant="ghost">
            <Link href={`/${lang}/dho/${id}/treasury`} className="w-full" passHref>
              Treasury
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="membership">
          <div className='flex flex-col items-center mt-4'>
            <ListOuterSpaces
              spaces={outerSpaces}
              outerSpacesCount={listOuterSpacesData.outerSpacesCount}
              onLoadMore={loadMoreOuterSpaces}
            />
            <ListInnerSpaces/>
            <ListMembers/>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}