import { Locale } from "@hypha-platform/i18n";
import { Text } from "@radix-ui/themes";
import { FilterMenu, Button } from "@hypha-platform/ui";
import { PlusIcon } from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hypha-platform/ui/server";
import Link from "next/link";
import { ListDiscussions } from '@hypha-platform/epics';

type PageProps = {
  params: { lang: Locale; id: string };
};

type OptionType = {
  label: string,
  value: string
}

type FilterType = {
  value: string,
  options: OptionType[]
}

const discussionsfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' }
  ],
};

const dummyData = {
  discussionsCount: 18,
}

export default async function AgreementsPage({ params: { lang, id } }: PageProps) {

  return (
    <div>
      <Tabs value="agreements" className="w-full mt-16">
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
        <TabsContent value="agreements">
          <div className='flex justify-between items-center mt-10'>
            <Text className='text-lg'>Discussions | {dummyData.discussionsCount}</Text>
            <div className='flex items-center'>
              <FilterMenu
                value={discussionsfilterSettings.value}
                options={discussionsfilterSettings.options}
              />
              <Button className='ml-2' variant="action" size="sm">
                <PlusIcon className='mr-2'/>
                Create
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className='mt-3'>
            <TabsList>
              <TabsTrigger value="all" variant='outlined'>All</TabsTrigger>
              <TabsTrigger value="open" variant='outlined'>Open</TabsTrigger>
              <TabsTrigger value="closed" variant='outlined'>Closed</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ListDiscussions/>
            </TabsContent>
            <TabsContent value="open">
              <ListDiscussions/>
            </TabsContent>
            <TabsContent value="closed">
              <ListDiscussions/>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}