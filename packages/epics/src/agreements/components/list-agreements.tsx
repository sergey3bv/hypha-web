'use client';
import { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@hypha-platform/ui/server';
import { Button, FilterMenu } from '@hypha-platform/ui';
import { CardAgreement } from './card-agreement';
import { listAgreementsData } from '@hypha-platform/ui-utils';

type ListAgreementsProps = Record<string, never>;

type OptionType = {
  label: string,
  value: string
}

type FilterType = {
  value: string,
  options: OptionType[]
}

const agreementsfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' }
  ],
};

export const ListAgreements: React.FC<ListAgreementsProps> = () => {
  const [agreements, setAgreements] = useState(listAgreementsData.agreements);
  const loadMoreAgreements = () => {
    const newAgreements = [
      {
        title: 'New Project Title',
        creator: {
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
          name: 'Jane',
          surname: 'Doe'
        },
        commitment: 50,
        status: 'active',
        views: 59,
        comments: 16,
      },
      {
        title: 'New Project Title',
        creator: {
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
          name: 'Jane',
          surname: 'Doe'
        },
        commitment: 50,
        status: 'active',
        views: 59,
        comments: 16,
      },
    ];
    setAgreements(prevAgreements => [...prevAgreements, ...newAgreements]);
  }
  return (
    <div>
      <div className='flex justify-between items-center mt-6'>
        <Text className='text-lg'>Agreements | {listAgreementsData.agreementsCount}</Text>
        <div className='flex items-center'>
          <FilterMenu
            value={agreementsfilterSettings.value}
            options={agreementsfilterSettings.options}
          />
        </div>
      </div>
      <TabsContent value="agreements">
        <Tabs defaultValue="all" className='mt-3'>
          <TabsList>
            <TabsTrigger value="all" variant='outlined'>All</TabsTrigger>
            <TabsTrigger value="active" variant='outlined'>Active</TabsTrigger>
            <TabsTrigger value="voting" variant='outlined'>On voting</TabsTrigger>
            <TabsTrigger value="completed" variant='outlined'>Completed</TabsTrigger>
            <TabsTrigger value="rejected" variant='outlined'>Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {agreements.map((agreement) => (
                  <CardAgreement views={agreement.views} comments={agreement.comments} title={agreement.title} creator={agreement.creator} commitment={agreement.commitment} status={agreement.status}/>
                ))}
              </div>
              <Button onClick={loadMoreAgreements} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more agreements
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="active">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {agreements.filter((agreement) => agreement.status === 'active').map((agreement) => (
                  <CardAgreement views={agreement.views} comments={agreement.comments} title={agreement.title} creator={agreement.creator} commitment={agreement.commitment} status={agreement.status}/>
                ))}
              </div>
              <Button onClick={loadMoreAgreements} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more agreements
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="voting">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {agreements.filter((agreement) => agreement.status === 'voting').map((agreement) => (
                  <CardAgreement views={agreement.views} comments={agreement.comments} title={agreement.title} creator={agreement.creator} commitment={agreement.commitment} status={agreement.status}/>
                ))}
              </div>
              <Button onClick={loadMoreAgreements} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more agreements
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {agreements.filter((agreement) => agreement.status === 'completed').map((agreement) => (
                  <CardAgreement views={agreement.views} comments={agreement.comments} title={agreement.title} creator={agreement.creator} commitment={agreement.commitment} status={agreement.status}/>
                ))}
              </div>
              <Button onClick={loadMoreAgreements} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more agreements
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="rejected">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {agreements.filter((agreement) => agreement.status === 'rejected').map((agreement) => (
                  <CardAgreement views={agreement.views} comments={agreement.comments} title={agreement.title} creator={agreement.creator} commitment={agreement.commitment} status={agreement.status}/>
                ))}
              </div>
              <Button onClick={loadMoreAgreements} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more agreements
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </div>
  )
}