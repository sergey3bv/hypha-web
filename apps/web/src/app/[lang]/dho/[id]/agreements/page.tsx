'use client';
import { Locale } from "@hypha-platform/i18n";
import { Tabs, TabsList, TabsTrigger } from "@hypha-platform/ui/server";
import Link from "next/link";
import { ListDiscussions, ListAgreements, ProposalsSection } from '@hypha-platform/epics';
import { listDiscussionsData, listAgreementsData } from "@hypha-platform/ui-utils";
import { useState } from "react";

type PageProps = {
  params: { lang: Locale; id: string };
};

export default function AgreementsPage({ params: { lang, id } }: PageProps) {
  const [discussions, setDiscussions] = useState(listDiscussionsData.discussions);
  const [agreements, setAgreements] = useState(listAgreementsData.agreements);

  const loadMoreDiscussions = () => {
    const newDiscussions = listDiscussionsData.newDiscussions
    setDiscussions(prevDiscussions => [...prevDiscussions, ...newDiscussions]);
  };
  const loadMoreAgreements = () => {
    const newAgreements = listAgreementsData.newAgreements
    setAgreements(prevAgreements => [...prevAgreements, ...newAgreements]);
  };

  return (
    <div>
      <Tabs value="agreements" className="w-full mt-16">
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
        <ListDiscussions
          discussions={discussions}
          discussionsCount={listDiscussionsData.discussionsCount}
          onLoadMore={loadMoreDiscussions}
        />
        <ProposalsSection/>
        <ListAgreements
          agreements={agreements}
          agreementsCount={listAgreementsData.agreementsCount}
          onLoadMore={loadMoreAgreements}
        />
      </Tabs>
    </div>
  );
}